# Estado da Nação – Tijolo 04

## O que foi implementado
- Comentários funcionais em posts de comunidade, com threading simples (2 níveis)
- Leitura pública de comentários
- Formulário de novo comentário e resposta, visível apenas para autenticados
- Exibição de autor, data/hora e distinção visual entre raiz e resposta
- Proteção RLS garantida para leitura pública e escrita autenticada
- UI enxuta, sem likes, reações, wiki, upload ou moderação avançada

## Rotas/telas alteradas
- `/comunidades/[slug]`: agora exibe comentários abaixo de cada post
- Novo componente: `components/communities/Comments.tsx`

## Schema/migration ajustados
- Nenhuma migration extra necessária: tabela `comments` já suportava threading

## Policies ajustadas
- Policies já cobriam leitura pública e escrita autenticada

## Fluxo de comentário raiz
- Usuário autenticado pode comentar em um post
- Comentário raiz tem `parent_id = null`

## Fluxo de resposta
- Usuário autenticado pode responder a um comentário
- Resposta tem `parent_id` apontando para o comentário raiz
- UI exibe até 2 níveis

## Limitações assumidas
- Sem likes, reações, wiki, upload, busca, admin ou moderação avançada
- Sem edição/deleção de comentários por enquanto
- Sem paginação ou colapso sofisticado

## Pendências
- Edição/deleção de comentários
- Threading mais profundo
- Wiki e acervo estruturado
- Sistema de ações comunitárias
- Busca e navegação avançada

## Riscos
- Crescimento do volume de comentários pode exigir paginação futura
- Threading profundo pode complicar a UI
- Falta de moderação pode gerar ruído em debates abertos

## Próximos 5 tijolos sugeridos
1. Ações comunitárias (reactions_as_actions)
2. Wiki/acervo colaborativo
3. Edição/deleção de comentários
4. Busca e navegação avançada
5. PWA/offline e federação inicial

## Comandos de validação
- Abrir `/comunidades/[slug]` como usuário deslogado: ler posts e comentários
- Logar e comentar em um post
- Responder a um comentário
- Ver atualização da UI após envio
- Tentar comentar deslogado: bloqueado

---

Para dúvidas, consulte os arquivos:
- `apps/nika-web/src/components/communities/Comments.tsx`
- `apps/nika-web/src/app/(app)/comunidades/[slug]/page.tsx`
- `supabase/migrations/20260318000001_schema_inicial.sql`
