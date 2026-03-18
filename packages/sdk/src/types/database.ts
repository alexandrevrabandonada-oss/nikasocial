/**
 * @nika/sdk – Tipos de domínio do banco de dados
 *
 * Este é o schema documentado do domínio Nika.
 * As tabelas abaixo AINDA NÃO FORAM MIGRADAS – são a especificação de domínio.
 *
 * Geração automática: quando o Supabase estiver configurado, use:
 *   npx supabase gen types typescript --project-id <id> > packages/sdk/src/types/database.ts
 *
 * Por ora, os tipos são escritos manualmente e servem como contrato.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * DECISÃO DE PRODUTO: Reações como Ações
 *
 * O Nika não usa "likes". Reações são modeladas como ações comunitárias.
 * Uma reação não é um contador – é um registro de participação.
 * Exemplos de tipos de ação: 'amplify', 'archive', 'translate', 'challenge', 'build_upon'
 *
 * Isso reflete a filosofia anarco-comunista: engajamento como contribuição,
 * não como aprovação individual acumulada.
 * ───────────────────────────────────────────────────────────────────────────
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      /**
       * profiles – extensão do auth.users
       * Cada usuário autenticado tem um profile público.
       */
      profiles: {
        Row: {
          id: string            // UUID – FK para auth.users.id
          username: string      // handle único, ex: @caio
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          website_url: string | null
          is_verified: boolean  // verificado pela comunidade, não por dinheiro
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }

      /**
       * communities – grupos de interesse / coletivos
       * Equivalente a comunidades do Orkut, mas autogestionados.
       * Sem dono central – moderação por consenso (implementação futura).
       */
      communities: {
        Row: {
          id: string
          slug: string          // identificador na URL, ex: /comunidades/feminismo-tech
          name: string
          description: string | null
          avatar_url: string | null
          is_public: boolean
          member_count: number  // desnormalizado para performance
          created_by: string    // FK profiles.id – fundador, não dono permanente
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['communities']['Row'], 'created_at' | 'updated_at' | 'member_count'>
        Update: Partial<Database['public']['Tables']['communities']['Insert']>
      }

      /**
       * posts – publicações nas comunidades
       * Suporta múltiplos formatos: texto, link, imagem.
       */
      posts: {
        Row: {
          id: string
          community_id: string  // FK communities.id
          author_id: string     // FK profiles.id
          title: string | null
          body: string | null   // Markdown
          post_type: 'text' | 'link' | 'image' | 'knowledge_ref'
          link_url: string | null
          image_url: string | null
          is_pinned: boolean
          is_removed: boolean   // remoção pela comunidade – não apaga o conteúdo
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'created_at' | 'updated_at' | 'is_pinned' | 'is_removed'>
        Update: Partial<Database['public']['Tables']['posts']['Insert']>
      }

      /**
       * comments – comentários em posts e em knowledge_pages
       * Suporte a threading simples (parent_id).
       */
      comments: {
        Row: {
          id: string
          post_id: string | null          // FK posts.id (nullable – comentário pode ser em knowledge_page)
          knowledge_page_id: string | null // FK knowledge_pages.id
          parent_id: string | null         // FK comments.id – threading
          author_id: string               // FK profiles.id
          body: string                    // Markdown
          is_removed: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'created_at' | 'updated_at' | 'is_removed'>
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
      }

      /**
       * reactions_as_actions – NÚCLEO FILOSÓFICO DO PRODUTO
       *
       * Reações não são likes. São ações que um membro da comunidade realiza
       * em relação a um conteúdo. Cada tipo de ação tem semântica diferente.
       *
       * Tipos de ação (expandíveis):
       * - 'amplify'      → quero que mais pessoas vejam isso
       * - 'build_upon'   → me inspirou, construí algo a partir disso
       * - 'challenge'    → discordo, quero debater
       * - 'translate'    → quero tornar acessível para outro grupo
       * - 'archive'      → tem valor histórico para o coletivo
       * - 'solidarity'   → manifesto apoio a quem criou
       *
       * Sem contador público de aprovação. Engajamento é visível como participação.
       */
      reactions_as_actions: {
        Row: {
          id: string
          actor_id: string      // FK profiles.id – quem realizou a ação
          target_type: 'post' | 'comment' | 'knowledge_page'
          target_id: string     // ID do objeto alvo
          action_type: 'amplify' | 'build_upon' | 'challenge' | 'translate' | 'archive' | 'solidarity'
          note: string | null   // opcional – contexto da ação
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reactions_as_actions']['Row'], 'created_at' | 'id'>
        Update: never          // ações são imutáveis – só insert e delete
      }

      /**
       * knowledge_pages – acervo colaborativo tipo wiki
       * Inspirado na Wikipedia mas sem neutralidade imposta – ponto de vista explícito.
       * Versioning simplificado: edição substitui o body atual, histórico futuro.
       */
      knowledge_pages: {
        Row: {
          id: string
          slug: string          // URL-friendly, ex: /acervo/feminismo-tecnologico
          title: string
          body: string          // Markdown – conteúdo principal
          summary: string | null
          community_id: string | null // pode pertencer a uma comunidade ou ser global
          created_by: string    // FK profiles.id
          last_edited_by: string | null // FK profiles.id
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['knowledge_pages']['Row'], 'created_at' | 'updated_at' | 'is_published'>
        Update: Partial<Database['public']['Tables']['knowledge_pages']['Insert']>
      }

      /**
       * project_links – hub de projetos externos conectados ao Nika
       *
       * O Nika funciona como hub que conversa com outros PWAs e projetos.
       * Esta tabela registra conexões com apps satélites, ferramentas coletivas,
       * repositórios, etc.
       *
       * NOTA SOBRE FEDERAÇÃO:
       * Federação real (ActivityPub / Fediverse) está planejada para fase posterior.
       * Por ora, project_links são links curados manualmente.
       */
      project_links: {
        Row: {
          id: string
          title: string
          description: string | null
          url: string
          logo_url: string | null
          link_type: 'pwa' | 'tool' | 'repo' | 'community' | 'other'
          community_id: string | null // pode estar associado a uma comunidade
          submitted_by: string        // FK profiles.id
          is_approved: boolean        // curadoria comunitária
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_links']['Row'], 'created_at' | 'updated_at' | 'is_approved'>
        Update: Partial<Database['public']['Tables']['project_links']['Insert']>
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }
  }
}
