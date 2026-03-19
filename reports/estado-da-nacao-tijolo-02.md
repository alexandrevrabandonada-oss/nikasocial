# Estado da Nação — Tijolo 02 ⚑

**Data**: 18 de Março de 2026  
**Objetivo**: Fundação de Autenticação, Autorização e Persistência de Usuário.

---

## 🏗 O que foi implementado

### 1. Autenticação Real (Supabase Auth)
- **Estratégia:** Autenticação via Email + Senha (escolhida pela estabilidade no Vercel).
- **Páginas:** `/entrar` e `/cadastrar` com fluxos reais via Server Actions.
- **Sessão:** Implementação de persistência usando `@supabase/ssr` (Next.js 15).
- **Callback:** `/auth/callback` configurado para troca de código de sessão real.

### 2. Proteção de Rotas (Middleware)
- **Privadas:** `/perfil`, `/comunidades`, `/acervo`.
- **Públicas:** `/`, `/entrar`, `/cadastrar`, `/explorar`.
- **Lógica:** Redirecionamento automático para login e proteção contra usuários logados em páginas de auth.

### 3. Persistência e Domínio
- **Schema:** Migração SQL executada com sucesso (7 tabelas principais).
- **RLS:** Políticas de segurança ativadas (leitura pública em posts/comunidades, escrita apenas autenticada).
- **Triggers:** Geração automática de `profile` ao realizar `signup`.

### 4. SDK Fortalecido
- **Auth Helpers:** `getCurrentProfile()` e `isAuthenticated()` disponíveis em `@nika/sdk`.
- **Reuso:** Preparado para futuros apps Vite no monorepo.

### 5. UI Conectada
- **Layout:** Dados reais do usuário (display name, email) no header e sidebar.
- **Explorar:** Feed real consumindo `posts` do Supabase.
- **Perfil:** Página funcional exibindo dados extraídos do profile.

---

## 📂 Arquivos Chave

| Caminho | Descrição |
|---|---|
| `apps/nika-web/src/lib/auth/actions.ts` | Server Actions de login/logout/signup |
| `apps/nika-web/src/middleware.ts` | Guardião de rotas e renovação de sessão |
| `packages/sdk/src/auth/index.ts` | Helpers de domínio no SDK |
| `supabase/migrations/` | Histórico de schema e RLS |

---

## 🚦 Como Validar Localmente

1. `pnpm install`
2. Configure `apps/nika-web/.env.local` com suas chaves Supabase.
3. `pnpm dev`
4. Acesse `/cadastrar`, crie uma conta real.
5. Verifique se o perfil aparece em `/perfil`.
6. Tente acessar `/explorar` deslogado (deve permitir) e `/acervo` deslogado (deve barrar).

---

## 🚩 Riscos e Pendências
- **SMTP no Supabase:** Para produção real, é necessário configurar SMTP para evitar limites de email.
- **OAuth:** GitHub OAuth planejado como próximo passo opcional.
- **Sync de Tipos:** Algumas inferências complexas do Supabase exigiram casting (`any`) em visualizações de joins (página explorar). Planejado refinar tipos no Tijolo 04.

---

## 🧱 Próximos 5 Tijolos Sugeridos

1. **Tijolo 03 — Comunidades**: Criação, listagem e participação ativa.
2. **Tijolo 04 — Acervo e Wiki**: Editor Markdown e base de conhecimento.
3. **Tijolo 05 — Ações Comunitárias**: Reações semânticas (Amplify, Solidarity, etc).
4. **Tijolo 06 — PWA Avançado**: Offline real e Workbox.
5. **Tijolo 07 — Hub e Federação**: Links de projetos externos e ActivityPub inicial.

---
**Nika: Por uma internet de baixo pra cima.**
