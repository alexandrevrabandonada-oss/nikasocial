# Estado da Nação — Tijolo 03 ◈

**Data**: 18 de Março de 2026  
**Objetivo**: Implementar o núcleo social — Comunidades e Posts.

---

## 🏗 O que foi implementado

### 1. Sistema de Comunidades
- **Listagem**: `/comunidades` exibe coletivos reais do banco.
- **Criação**: `/comunidades/nova` permite iniciar novos agrupamentos (exclusivo para autenticados).
- **Território**: Cada comunidade tem uma página própria em `/comunidades/[slug]` com manifesto e feed.

### 2. Fluxo de Publicação (Posts)
- **Integração**: Posts são vinculados obrigatoriamente a uma comunidade.
- **Formulário**: Área de postagem rápida inserida diretamente na página da comunidade.
- **Realtime (Revalidate)**: O feed atualiza imediatamente após a postagem via Server Actions.

### 3. Vínculo de Identidade
- Exibição de nomes reais ou usernames nos posts e na autoria da comunidade.
- Conexão direta com a tabela `profiles` do Tijolo 02.

---

## 📂 Arquivos Chave

| Caminho | Descrição |
|---|---|
| `apps/nika-web/src/lib/communities/actions.ts` | Server Actions de criação de conteúdo |
| `apps/nika-web/src/app/(app)/comunidades/[slug]/page.tsx` | Página dinâmica da comunidade (feed + info) |
| `apps/nika-web/src/components/communities/PostForm.tsx` | Componente de postagem rápida |

---

## 🚦 Como Validar Localmente

1. `pnpm install`
2. `pnpm dev`
3. Logado: Acesse `/comunidades/nova` e crie um coletivo.
4. Na página do coletivo, crie um post.
5. Deslogado: Verifique se consegue ler as listagens e feeds, mas não consegue postar.

---

## 🧱 Próximos 5 Tijolos Sugeridos

1. **Tijolo 04 — Acervo e Wiki**: A base de conhecimento compartilhada.
2. **Tijolo 05 — Ações e Comentários**: Diálogo profundo e reações semânticas.
3. **Tijolo 06 — PWA Offline**: Performance e resiliência sem rede.
4. **Tijolo 07 — Hub de Projetos**: Conexão com apps externos do ecossistema.
5. **Tijolo 08 — Notificações**: Realtime updates no ecossistema.

---
**Nika: O coletivo é a unidade mínima.**
