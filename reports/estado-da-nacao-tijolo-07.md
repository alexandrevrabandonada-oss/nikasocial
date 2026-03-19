# Estado da Nação – TIJOLO 07: Portal/Ecossistema Multiapp

## O que foi implementado
- Ativação e ajuste da tabela `project_links` para domínio real do produto
- Migration: `supabase/migrations/20260318000005_project_links_tijolo07.sql`
- Atualização dos types: `packages/sdk/src/types/database.ts`
- Rotas públicas: `/projetos`, `/projetos/[slug]`
- Rota protegida: `/projetos/novo`
- Formulário de cadastro: `apps/nika-web/src/components/projects/ProjectForm.tsx`
- Blocos de projetos em: `comunidades/[slug]`, `acervo/[slug]`
- Navegação principal e home/explorar destacando o Nika como portal
- Compartilhamento simples de páginas de projeto (metadados)
- Taxonomia mínima de `project_type` documentada
- Documentação atualizada: `docs/arquitetura.md`, `docs/roadmap.md`, `docs/manifesto.md`

## Arquivos criados/editados
- Migration: `supabase/migrations/20260318000005_project_links_tijolo07.sql`
- Types: `packages/sdk/src/types/database.ts`
- Rotas: `apps/nika-web/src/app/projetos/page.tsx`, `apps/nika-web/src/app/projetos/novo/page.tsx`, `apps/nika-web/src/app/projetos/[slug]/page.tsx`
- Form: `apps/nika-web/src/components/projects/ProjectForm.tsx`
- Actions: `apps/nika-web/src/lib/projects/actions.ts`
- Blocos: `apps/nika-web/src/app/(app)/comunidades/[slug]/page.tsx`, `apps/nika-web/src/app/acervo/[slug]/page.tsx`
- Navegação: `apps/nika-web/src/app/(app)/layout.tsx`, `apps/nika-web/src/app/page.tsx`, `apps/nika-web/src/app/(app)/explorar/page.tsx`
- Documentação: `docs/arquitetura.md`, `docs/roadmap.md`, `docs/manifesto.md`

## Rotas criadas/alteradas
- `/projetos` (listagem pública)
- `/projetos/novo` (criação autenticada)
- `/projetos/[slug]` (detalhe público)
- Blocos em `/comunidades/[slug]` e `/acervo/[slug]`

## Migration criada
- `supabase/migrations/20260318000005_project_links_tijolo07.sql`

## Tabela/colunas criadas ou ajustadas
- `project_links`: id, title, slug, url, project_type, description, icon_name, community_id, knowledge_page_id, created_by, created_at, updated_at, is_active

## Policies criadas/alteradas
- Leitura pública de projetos ativos
- Criação apenas autenticada
- Update/delete só pelo criador

## Taxonomia de `project_type`
- `pwa`, `site`, `ferramenta`, `mapa`, `acervo_externo`, `acao`

## Fluxo de criação de projeto/link
1. Usuário autenticado acessa `/projetos/novo`
2. Preenche título, slug, url, tipo, descrição, vínculos opcionais
3. Projeto aparece em `/projetos` e nos blocos de comunidade/acervo vinculados

## Como comunidade e acervo se conectam aos projetos
- Bloco "Projetos ligados a esta comunidade" em `/comunidades/[slug]`
- Bloco "Projetos relacionados" em `/acervo/[slug]`

## Pendências
- SSO, embeds vivos, sync, analytics, previews ricos, federação, governança complexa
- Upload de logo/icon
- Busca avançada
- Moderação/editorial

## Riscos
- Crescimento desorganizado de links sem curadoria
- Falta de integração visual entre projetos externos
- Possível spam se não houver moderação futura

## Próximos 5 tijolos sugeridos
1. SSO e autenticação federada
2. Embeds vivos e integrações contextuais
3. Moderação/editorial de projetos e acervo
4. Analytics e métricas de navegação
5. Busca avançada e filtros multiapp

## Comandos de validação
- Aplicar migration:
  supabase db push
- Testar rotas públicas:
  - Abrir `/projetos` (deve listar projetos ativos)
  - Abrir `/projetos/[slug]` (detalhe)
- Testar criação:
  - Logar, acessar `/projetos/novo`, cadastrar projeto
- Testar blocos:
  - Ver projetos em `/comunidades/[slug]` e `/acervo/[slug]`
- Testar navegação:
  - Home e explorar devem mencionar o Nika como portal
