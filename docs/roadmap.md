# Roadmap Nika – Por Tijolos

**Metodologia**: o Nika é construído em "tijolos" — iterações pequenas, coesas, com entrega verificável.
Cada tijolo tem escopo definido antes de começar. Sem feature creep dentro do tijolo.

---

## Tijolo 01 — Fundação ✓
**Status**: Concluído — Março 2026

- [x] Monorepo pnpm + Turborepo 2
- [x] `packages/config` — tsconfig e eslint compartilhados
- [x] `packages/ui` — tokens de design system (Concreto Zen)
- [x] `packages/sdk` — tipos de domínio + cliente Supabase base
- [x] `apps/nika-web` — Next.js 15 App Router
- [x] Layout autenticado (sidebar + topbar mobile)
- [x] Landing page logged-out
- [x] Rotas placeholder: /, /explorar, /comunidades, /acervo, /perfil
- [x] Middleware de sessão Supabase
- [x] manifest.json + sw.js stub
- [x] Documentação: manifesto, arquitetura, roadmap

---

## Tijolo 02 — Auth + Explorar
**Escopo previsto**

- [ ] Auth magic link funcional (Supabase)
- [ ] Página /entrar com Server Action
- [ ] Callback de auth (`/auth/callback`)
- [ ] Middleware protegendo rotas corretamente
- [ ] Seed de dados de teste no Supabase
- [ ] Feed básico em /explorar (lista de posts públicos hard-coded ou seed)
- [ ] Componentes: `PostCard`, `EmptyState`, `LoadingState`

---

## Tijolo 03 — Comunidades
**Escopo previsto**

- [ ] Migração do schema para Supabase (profiles, communities, posts)
- [ ] Listagem de comunidades públicas
- [ ] Página de comunidade individual
- [ ] Entrar/sair de comunidade
- [ ] Criar post em uma comunidade
- [ ] Componentes: `CommunityCard`, `PostForm`

---

## Tijolo 04 — Acervo
**Escopo previsto**

- [ ] Migração do schema: knowledge_pages
- [ ] Listagem de páginas do acervo
- [ ] Página de conhecimento individual (leitura)
- [ ] Editor básico (Markdown)
- [ ] Criar nova página de conhecimento
- [ ] Vinculação com comunidades

---

## Tijolo 05 — Perfil + Ações
**Escopo previsto**

- [ ] Página de perfil individual (/perfil/[username])
- [ ] Editar perfil (nome, bio, avatar)
- [ ] Sistema de reactions_as_actions (amplify, challenge, etc)
- [ ] UI de ação: sem "like", com escolha de tipo de ação
- [ ] Histórico de ações do usuário no perfil

---

## Tijolo 06 — PWA Real
**Escopo previsto**

- [ ] Workbox integrado (via next-pwa ou config manual)
- [ ] Precaching de assets estáticos
- [ ] Página de offline fallback
- [ ] Instalação PWA testada no Android e desktop
- [ ] Ícones reais (192 e 512)

---

## Tijolo 07 — Conexões e Hub
**Escopo previsto**

- [ ] Migração: project_links
- [ ] Página de projetos conectados
- [ ] Submissão manual de projeto externo
- [ ] Aprovação por curadoria da comunidade
- [ ] Exibição de project_links na página de comunidade

---

## Tijolos Futuros (sem ordem definida)

- **Comentários e threads** — comments com threading visual
- **Notificações** — realtime via Supabase
- **Busca global** — PostgreSQL full-text + futuramente pgvector
- **CI/CD** — GitHub Actions + testes automatizados
- **App satélite Vite** — demonstração de ecossistema multiapp
- **Federação ActivityPub** — fase posterior, servidor separado

---

## O que não está no roadmap (intencionalmente)

- Algoritmo de recomendação baseado em engajamento
- Publicidade ou monetização por atenção
- Verificação por dinheiro ou status
- Ranking de usuários por popularidade
- Contador público de seguidores como métrica central
