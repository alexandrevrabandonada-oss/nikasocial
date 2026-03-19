# Estado da Nação – TIJOLO 08: Governança e Moderação Mínima

## O que foi implementado
- Tabelas: `content_flags`, `moderation_events`, `user_roles`
- Migrations: `20260318000006_governanca_tijolo08.sql`, `20260318000007_acervo_protecao_tijolo08.sql`
- Papéis mínimos: admin/moderator (global/comunidade)
- Proteção do acervo: campo `is_locked` em `knowledge_pages` (admin/moderator pode travar)
- Proteção de projetos: ocultação/desativação via `is_active`
- Policies/RLS para flags, moderação e papéis
- UI de sinalização (FlagButton) em páginas de acervo e projetos
- Rota `/moderacao` para admin/moderator ver e agir sobre flags
- Listagens públicas respeitam ocultação/restrição
- Documentação atualizada: `docs/arquitetura.md`, `docs/roadmap.md`, `docs/manifesto.md`

## Arquivos criados/editados
- Migrations: `supabase/migrations/20260318000006_governanca_tijolo08.sql`, `20260318000007_acervo_protecao_tijolo08.sql`
- Types: `packages/sdk/src/types/database.ts`
- Actions: `apps/nika-web/src/lib/moderation/actions.ts`
- UI: `apps/nika-web/src/components/moderation/FlagButton.tsx`, `apps/nika-web/src/app/moderacao/page.tsx`
- Integração: `apps/nika-web/src/app/acervo/[slug]/page.tsx`, `apps/nika-web/src/app/projetos/[slug]/page.tsx`, `apps/nika-web/src/app/projetos/page.tsx`
- Documentação: `docs/arquitetura.md`, `docs/roadmap.md`, `docs/manifesto.md`

## Migrations criadas
- `supabase/migrations/20260318000006_governanca_tijolo08.sql`
- `supabase/migrations/20260318000007_acervo_protecao_tijolo08.sql`

## Tabelas e colunas criadas/alteradas
- `content_flags`, `moderation_events`, `user_roles`
- `knowledge_pages.is_locked`

## Policies criadas/alteradas
- Flags: criar só autenticado, ler só admin/moderator
- Moderação: criar evento só admin/moderator
- Papéis: só admin pode criar admin global
- Acervo: só admin/moderator edita página travada

## Papéis implementados
- admin global: modera tudo
- moderator de comunidade: modera conteúdo da sua comunidade

## Regra escolhida para proteção do acervo
- Qualquer autenticado pode editar, MAS admin/moderator pode travar página (`is_locked`). Se travada, só admin/moderator edita.

## Fluxo de flag
1. Usuário autenticado pode sinalizar página de acervo ou projeto
2. Flag registrada em `content_flags`

## Fluxo de moderação
1. Admin/moderator acessa `/moderacao`, vê flags abertas
2. Aplica ação (ex: lock_edit, hide)
3. Evento registrado em `moderation_events`
4. Página/projeto passa a respeitar restrição/ocultação

## Pendências
- Fila editorial rica, apelação, reputação, conselho comunitário, logs públicos detalhados, analytics, SSO, federação

## Riscos
- Moderação insuficiente em comunidades grandes
- Possível abuso de flags se não houver acompanhamento
- Falta de apelação pode gerar bloqueios indevidos

## Próximos 5 tijolos sugeridos
1. Fila editorial rica e apelação
2. Reputação e conselho comunitário
3. Logs públicos detalhados de moderação
4. Analytics e métricas de governança
5. Integração federada e SSO

## Comandos de validação
- Aplicar migrations:
  supabase db push
- Testar sinalização:
  - Logar, abrir página de acervo ou projeto, clicar em "Sinalizar"
- Testar moderação:
  - Logar como admin/moderator, acessar `/moderacao`, aplicar ação
- Testar restrição:
  - Travar página, tentar editar como usuário comum (deve bloquear)
- Testar ocultação:
  - Ocultar projeto, conferir sumiço da listagem pública
