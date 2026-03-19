## Governança e Moderação Mínima (TIJOLO 08)

**Por que agora?**
Com o crescimento do acervo e dos projetos, é necessário proteger a memória coletiva e o ecossistema contra spam, vandalismo e desorganização, sem criar burocracia ou centralismo excessivo.

### Tabelas de Governança
- `content_flags`: flags abertas por usuários autenticados (motivos simples)
- `moderation_events`: ações aplicadas por admin/moderator
- `user_roles`: papéis mínimos (admin/moderator, global/comunidade)

### Papéis
- admin global pode moderar tudo
- moderator de comunidade pode moderar conteúdo vinculado à sua comunidade
- usuários comuns não moderam

### Proteção do Acervo
- Qualquer autenticado pode editar, MAS admin/moderator pode travar página (`is_locked`).
- Se travada, só admin/moderator pode editar.
- Decisão: Opção A (trava leve, rastreável, sem fila editorial).

### Proteção de Projetos
- Projeto pode ser ocultado/desativado por moderação (`is_active = false`)
- Listagem pública só mostra ativos
- Criador não pode desfazer moderação

### Fluxo de Flag/Moderação
1. Usuário autenticado pode sinalizar conteúdo (acervo, projeto)
2. Admin/moderator vê fila em `/moderacao`, aplica ação simples
3. Eventos de moderação registrados

### O que ficou adiado
- Fila editorial rica, apelação, reputação, conselho comunitário, logs públicos detalhados, analytics, SSO, federação
## Projetos e Ecossistema Multiapp (TIJOLO 07)

O Nika deixa de ser rede isolada e passa a funcionar como hub/portal para outros PWAs, ferramentas e ações do ecossistema.

### Tabela `project_links`
- id, title, slug, url, project_type, description, icon_name (nullable), community_id (nullable), knowledge_page_id (nullable), created_by, created_at, updated_at, is_active
- Vínculo opcional com comunidade e/ou página de acervo
- Slug único, url obrigatória
- Leitura pública de projetos ativos, criação autenticada, update/delete só pelo criador

### Taxonomia de `project_type`
- `pwa`: Progressive Web App
- `site`: site institucional ou informativo
- `ferramenta`: utilitário, app funcional
- `mapa`: visualização geográfica
- `acervo_externo`: wiki, base de conhecimento fora do Nika
- `acao`: ação, campanha, mobilização

### Rationale
O Nika é portal porque comunidades precisam dialogar com outros apps, mapas, ferramentas e acervos. A ponte com outros PWAs é estrutural, não cosmética. Não há microfrontend, SSO, federação ou preview rico neste tijolo.

### O que ficou adiado
- SSO, embeds vivos, sync, analytics, previews ricos, federação, governança complexa.
# Arquitetura do Nika

**Versão 0.3 — Março 2026**

---

## Visão Geral

O Nika é um ecossistema multiapp organizado como monorepo.
O app principal (`nika-web`) é o hub central.

---

## Núcleo Político: Comunidades

No Nika, a **Comunidade** é a unidade fundamental de organização técnica e política. Diferente de redes sociais tradicionais onde o indivíduo é o centro (feed egocêntrico), aqui o fluxo de informação e poder nasce em espaços coletivos.

### Por que Comunidades antes de Wiki/Fediverso?
A Wiki (Acervo) e a Federação são ferramentas de escala e memória, mas sem um **circuito social** (pessoas trocando e deliberando), elas se tornam cemitérios de dados ou ruído técnico. O Tijolo 03 priorizou o "estar junto" e o "postar" para validar a mecânica de diálogo do projeto.

---

## Stack

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Monorepo | pnpm + Turborepo 2 | performance, cache |
| App principal | Next.js 15 (App Router) | SSR, RSC, Server Actions |
| Auth + DB + Storage | Supabase | OSS, PostgreSQL, RLS |
| Deploy | Vercel | Vercel-native |
| UI | Vanilla CSS + Tokens | Controle total e identidade 2026 |

---

## Domínio de Dados (Implementado)

| Tabela | Status | Papel no Circuito Social |
|---|---|---|
| `profiles` | Ativa | Identidade mínima vinculada à Auth. |
| `communities` | Ativa | Unidade territorial e política. Suporta slugs únicos. |
| `posts` | Ativa | Unidade de discurso dentro de uma comunidade. |

---



## Ações Comunitárias antes de Ranking

**Por que o Nika substitui likes por ações?**
No Nika, ações comunitárias substituem likes para expressar o impacto coletivo de um post. Cada ação tem sentido político claro e não gera score individual. Não há ranking, reputação ou gamificação de ego.

**Sentido político de cada ação:**
- apoiar: demonstra suporte comunitário
- confirmar: reconhece/valida o conteúdo
- replicar: indica que deve circular
- convocar: chama para mobilização
- acervo: sugere para a memória coletiva

**Por que ainda não existe ranking ou reputação individual?**
O Nika rejeita métricas de aprovação individual. O foco é no coletivo, não no acúmulo de prestígio pessoal.

**Por que comentários vieram antes de wiki?**
O Nika prioriza o debate comunitário porque a memória estruturada (wiki/acervo) só faz sentido quando há troca real entre pessoas. Comentários e discussões são o núcleo do circuito social, validando a necessidade de memória coletiva. A wiki será construída sobre debates já existentes, não o contrário.

**O que ficou adiado conscientemente:**
- Wiki/acervo estruturado
- Reações e ações comunitárias
- Moderação avançada
- Uploads e mídia
- Busca e federação

**Resumo:**
O Tijolo 04 aprofunda o núcleo social, preparando o terreno para ações comunitárias e memória estruturada nos próximos ciclos.

## Acervo Colaborativo: Memória Viva

**Por que o acervo veio agora?**
O Nika só cumpre seu papel político se for mais que timeline: precisa de memória coletiva. O acervo permite que comunidades construam saberes vivos, versionados e editáveis.

**Domínio:**
- `knowledge_pages`: páginas de acervo, vinculadas a comunidades, editáveis por qualquer autenticado.
- `knowledge_page_revisions`: cada edição relevante gera snapshot, com nota opcional.

**Fluxo:**
- Criação e edição por qualquer autenticado.
- Cada edição gera revisão.
- Slug único, vínculo opcional com comunidade.
- Leitura pública.

**Decisão de permissão:**
Neste tijolo, qualquer usuário autenticado pode criar e editar páginas. Não há aprovação editorial nem bloqueio por papel.

**O que ficou adiado:**
- Upload, diff visual, moderação, automações, comentários em páginas.
1. **Comentários**: O foco do Tijolo 03 era a criação de comunidades e posts. O threading visual (comentários) virá quando a base de posts estiver estável.
2. **Edição de Posts**: A imutabilidade parcial incentiva a reflexão antes da postagem, alinhado à estética de "obra/concreto".
3. **Imagens**: Foco no discurso textual para reduzir ruído visual inicial.

---

## Autenticação e Segurança
- **RLS**: Proteção em nível de linha garante que apenas criadores/autores manipulem seus dados.
- **Middleware**: Redirecionamentos automáticos para áreas de criação.
