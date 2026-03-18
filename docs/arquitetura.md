# Arquitetura do Nika

**Versão 0.1 — Março 2026**

---

## Visão Geral

O Nika é um ecossistema multiapp organizado como monorepo.
O app principal (`nika-web`) é o hub central. Apps satélites podem ser adicionados ao mesmo monorepo ou como repositórios externos que consomem `@nika/sdk`.

```
nika/                          ← raiz do monorepo
├── apps/
│   └── nika-web/              ← app principal (Next.js 15, App Router)
├── packages/
│   ├── config/                ← tsconfig, eslint compartilhados
│   ├── ui/                    ← design system (tokens, componentes)
│   └── sdk/                   ← cliente Supabase, tipos de domínio
└── docs/                      ← documentação técnica e de produto
```

---

## Stack

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Monorepo | pnpm + Turborepo 2 | performance, cache, workspace nativo |
| App principal | Next.js 15 (App Router) | SSR, SSG, RSC, Vercel-native |
| Auth + DB + Storage | Supabase | OSS, PostgreSQL real, RLS nativo |
| Deploy | Vercel | zero-config Next.js, edge functions |
| Linguagem | TypeScript strict | contrato de domínio, segurança de tipos |
| CSS | Vanilla CSS + custom properties | zero dependência, controle total |
| PWA | manifest.json + Service Worker | instalável, offline-ready (fase 2) |

---

## Apps e Packages

### `apps/nika-web`
App principal. Next.js App Router com:
- Route groups: `(app)/` para rotas autenticadas
- Middleware de sessão Supabase
- Layout autenticado com sidebar + topbar mobile
- Landing pública em `/`

### `packages/config`
Configurações compartilhadas:
- `tsconfig.base.json` — TS strict para todos
- `tsconfig.next.json` — extends base + Next.js specifics
- `eslint.config.js` — flat config base

### `packages/ui`
Design system base:
- Tokens: cores, tipografia, espaçamento, radii, breakpoints
- Tema: **Concreto Zen / industrial-stencil**
- Paleta: preto-concreto + amarelo-obra como acento
- Componentes virão em tijolos subsequentes

### `packages/sdk`
Helpers compartilhados:
- `createNikaClient()` — Supabase client para Vite e Next
- Tipos TypeScript de domínio (`Database` interface)
- Suporta env vars de Next (`NEXT_PUBLIC_*`) e Vite (`VITE_*`)

---

## Domínio de Dados

Schema documentado em TypeScript. Tabelas ainda não migradas ao Supabase.
Ver: `packages/sdk/src/types/database.ts`

### Tabelas principais

| Tabela | Descrição |
|---|---|
| `profiles` | Extensão de auth.users – perfil público |
| `communities` | Grupos autogestionados |
| `posts` | Publicações nas comunidades (texto, link, imagem) |
| `comments` | Comentários em posts e knowledge_pages, com threading |
| `reactions_as_actions` | **Núcleo filosófico** – reações como ações, não likes |
| `knowledge_pages` | Wiki colaborativa com ponto de vista explícito |
| `project_links` | Hub de projetos externos conectados ao Nika |

### Decisão: Reações como Ações

Reações no Nika não são likes. São ações comunitárias com semântica própria:

- `amplify` — quero que mais pessoas vejam
- `build_upon` — construí algo a partir disso
- `challenge` — discordo, quero debater
- `translate` — quero tornar acessível
- `archive` — valor histórico para o coletivo
- `solidarity` — apoio a quem criou

Isso reflete a rejeição de métricas de aprovação individual como moeda de engajamento.

---

## Autenticação

- Supabase Auth via `@supabase/ssr`
- Middleware Next.js gerencia sessão em todas as requisições
- Estratégia: magic link por email (sem senha)
- OAuth futuro: somente plataformas alinhadas (GitHub, sem Google por padrão)
- Proteção de rotas: `/perfil`, `/explorar`, `/comunidades`, `/acervo`

---

## PWA

- `manifest.json` em `public/`
- `sw.js` — stub funcional, sem cache ainda
- Service worker registrado no `layout.tsx` root
- Próxima fase: Workbox para precaching e offline fallback

---

## Deploy

### Vercel (nika-web)
- Build command: `pnpm build`
- Root directory: `apps/nika-web`
- Variáveis de ambiente obrigatórias:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL`

### GitHub
- Repositório público (planejado)
- Branch `main` → deploy de produção
- Branch `develop` → previews no Vercel
- PRs com preview automático

---

## Princípios de Extensibilidade

1. **Apps satélites no monorepo**: qualquer app Vite ou Next pode ser adicionado em `apps/` e consumir `@nika/ui` e `@nika/sdk`.

2. **Apps satélites externos**: basta instalar `@nika/sdk` como dependência (quando publicado no npm).

3. **Federação futura**: a tabela `project_links` é o ponto de entrada manual. ActivityPub será implementado como camada separada, sem afetar o core do produto.

4. **Supabase como plataforma**: RLS, realtime, storage e edge functions estão disponíveis. Usar conforme necessidade, sem over-engineering precoce.

---

## O que NÃO foi implementado ainda

- Componentes concretos de UI (botões, cards, inputs como módulos React)
- Auth funcional end-to-end
- Qualquer feature de produto real
- Migração do schema para o Supabase
- Cache e offline real no Service Worker
- Federação / ActivityPub
- Testes automatizados
- CI/CD pipeline
