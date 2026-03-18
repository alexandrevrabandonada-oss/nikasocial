# Estado da Nação — Tijolo 01

**Data**: 2026-03-18  
**Versão do projeto**: 0.1.0  
**Fase**: Fundação

---

## Árvore do Projeto

```
c:\Projetos\Nika\
├── apps\
│   └── nika-web\            → App principal Next.js 15
│       ├── public\
│       │   ├── manifest.json
│       │   └── sw.js        [STUB]
│       ├── src\
│       │   ├── app\
│       │   │   ├── (app)\   → Route group autenticado
│       │   │   │   ├── layout.tsx       → layout sidebar + topbar
│       │   │   │   ├── explorar\page.tsx [PLACEHOLDER]
│       │   │   │   ├── comunidades\page.tsx [PLACEHOLDER]
│       │   │   │   ├── acervo\page.tsx  [PLACEHOLDER]
│       │   │   │   └── perfil\page.tsx  [PLACEHOLDER]
│       │   │   ├── entrar\page.tsx
│       │   │   ├── globals.css          → tokens como CSS custom properties
│       │   │   ├── layout.tsx           → root layout com metadata PWA
│       │   │   └── page.tsx             → landing logged-out
│       │   ├── lib\supabase\
│       │   │   ├── server.ts            → SSR client (@supabase/ssr)
│       │   │   └── client.ts            → browser client
│       │   └── middleware.ts            → session + route protection
│       ├── .env.example
│       ├── eslint.config.mjs
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages\
│   ├── config\              → tsconfig base + next + eslint
│   │   ├── tsconfig.base.json
│   │   ├── tsconfig.next.json
│   │   ├── eslint.config.js
│   │   └── package.json
│   │
│   ├── ui\                  → design system
│   │   ├── src\tokens\index.ts   → cores, tipografia, espaçamento, radii
│   │   ├── src\index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── sdk\                 → helpers compartilhados
│       ├── src\supabase\client.ts → createNikaClient + getNikaClient
│       ├── src\types\database.ts  → schema documentado em TypeScript
│       ├── src\index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── docs\
│   ├── manifesto.md
│   ├── arquitetura.md
│   └── roadmap.md
│
├── reports\
│   └── estado-da-nacao-tijolo-01.md   ← este arquivo
│
├── .gitignore
├── .prettierrc
├── package.json             → raiz monorepo (pnpm + turborepo)
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Decisões Técnicas Tomadas

### 1. pnpm + Turborepo 2 como base do monorepo
- Turborepo 2 usa campo `tasks` em `turbo.json` (não mais `pipeline`)
- Cache inteligente de build por package
- `pnpm-workspace.yaml` define `apps/*` e `packages/*`

### 2. Next.js 15 com App Router
- Route group `(app)/` para separar rotas autenticadas com layout próprio
- `middleware.ts` na raiz de `src/` para intercepção correta
- `@supabase/ssr` para gerenciamento de sessão sem tocar em JWT manual

### 3. Supabase via variáveis de ambiente — sem hardcode
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` obrigatórias
- Falha rápida com mensagem clara se env ausente
- Cliente server-side usa `cookies()` assíncrono do Next 15

### 4. Schema documentado em TypeScript antes das migrações
- `packages/sdk/src/types/database.ts` é o contrato de domínio
- 7 tabelas com tipos completos (Row, Insert, Update)
- Filosofia das reações-como-ações documentada nos comentários inline

### 5. CSS Vanilla com custom properties
- Zero dependência de framework CSS
- Todos os tokens do tema Concreto Zen como variáveis CSS
- Fácil troca de tema no futuro sem refatorar componentes

### 6. PWA Stub consciente
- `manifest.json` funcional e completo
- `sw.js` é um stub documentado — não faz cache ainda
- Registro do SW no `layout.tsx` root — pronto para ativar Workbox

### 7. Reações como ações (decisão de produto)
- Sem `likes` em nenhuma tabela
- `reactions_as_actions` com `action_type` tipado
- Documentado no schema, manifesto e arquitetura

---

## Pendências

| Item | Prioridade | Tijolo |
|---|---|---|
| Ícones PWA reais (192px, 512px) | Alta | 02 |
| Auth magic link funcional | Alta | 02 |
| Migração do schema para Supabase | Alta | 03 |
| Componentes React em `packages/ui` | Média | 02-03 |
| Testes automatizados | Média | após 03 |
| CI/CD GitHub Actions | Média | após 03 |
| Workbox + offline real | Baixa | 06 |
| Federação ActivityPub | Muito baixa | fase posterior |

---

## Riscos

### R1 – Schema divergir dos tipos TypeScript [MÉDIO]
O `database.ts` foi escrito manualmente. Quando o Supabase estiver configurado, é necessário gerar os tipos automaticamente:
```
npx supabase gen types typescript --project-id <id> > packages/sdk/src/types/database.ts
```
Risco de desalinhamento até isso ser feito.

### R2 – Middleware sem env vars em preview [BAIXO]
O middleware tem fallback para evitar crash sem variáveis de ambiente, mas a proteção de rotas ficará desativada nesse caso. Documentado no código.

### R3 – Ícones PWA ausentes [BAIXO]
`manifest.json` referencia `/icons/icon-192.png` e `/icons/icon-512.png` que ainda não existem. Não quebra o app, mas o PWA não é instalável.

### R4 – sw.js sem cache pode performar pior que sem SW [MUITO BAIXO]
O service worker stub está registrado e ativo, mas sem estratégia de cache. Em condições normais de rede, é neutro. Implementar Workbox no Tijolo 06.

---

## Próximos 5 Tijolos Sugeridos

### Tijolo 02 – Auth + Explorar
Prioridade máxima. Sem auth funcional, nada mais faz sentido validar.
Escopo: magic link, callback, seed de dados, feed básico em /explorar.

### Tijolo 03 – Comunidades
Primeira feature real de produto. Schema migrado para Supabase.
Escopo: CRUD de comunidade, entrada/saída, criação de post.

### Tijolo 04 – Acervo (Wiki)
Segunda feature de produto. Diferencia o Nika de uma rede social genérica.
Escopo: páginas de conhecimento, editor Markdown, vinculação com comunidades.

### Tijolo 05 – Perfil + Ações comunitárias
Implementa o núcleo filosófico: reações como ações.
Escopo: perfil editável, reactions_as_actions na UI, histórico de participação.

### Tijolo 06 – PWA Real
Transforma o Nika em app instalável com experiência offline.
Escopo: Workbox, precaching, offline page, ícones reais.

---

## Instruções de Execução

### Pré-requisitos
- Node.js >= 20
- pnpm >= 9

### Install
```bash
cd c:\Projetos\Nika
pnpm install
```

### Configurar ambiente
```bash
# Em apps/nika-web/
cp .env.example .env.local
# Editar .env.local com suas credenciais Supabase
```

### Dev
```bash
pnpm dev
# Acesse: http://localhost:3000
```

### Build
```bash
pnpm build
```

### Lint
```bash
pnpm lint
```

### Type check
```bash
pnpm type-check
```

---

*Gerado em: 2026-03-18*
