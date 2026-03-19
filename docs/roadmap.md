## Tijolo 08 — Governança e Moderação Mínima

**Entregue:**
- Tabelas: `content_flags`, `moderation_events`, `user_roles`
- Papéis mínimos: admin/moderator (global/comunidade)
- Proteção do acervo: trava leve (`is_locked`)
- Proteção de projetos: ocultação/desativação
- Fluxo de flag e moderação mínima
- UI de sinalização e moderação

**Decisões:**
- Trava leve no acervo (admin/moderator pode travar)
- Projeto ocultado some das listagens

**Próximos passos (adiados):**
- Fila editorial rica, apelação, reputação, conselho comunitário, logs públicos detalhados, analytics, SSO, federação

---
## Tijolo 07 — Portal/Ecossistema Multiapp

**Entregue:**
- Ativação e ajuste de `project_links` como domínio real
- Rotas públicas: `/projetos`, `/projetos/[slug]`
- Rota protegida: `/projetos/novo`
- Blocos de projetos em comunidades e acervo
- Navegação principal e home destacando o Nika como portal
- Compartilhamento simples de páginas de projeto
- Taxonomia mínima de `project_type` documentada

**Taxonomia:**
- `pwa`, `site`, `ferramenta`, `mapa`, `acervo_externo`, `acao`

**Decisões:**
- Portal, não app isolado
- Sem microfrontend, SSO, federação, preview rico, analytics

**Próximos passos (adiados):**
- SSO, embeds vivos, sync, analytics, previews ricos, federação, governança complexa

---
# Roadmap Nika – Por Tijolos

**Metodologia**: o Nika é construído em "tijolos" — iterações pequenas, coesas, com entrega verificável.

---

## Tijolo 01 — Fundação ✓
**Status**: Concluído — Março 2026

---

## Tijolo 02 — Auth, Domínio e Persistência ✓
**Status**: Concluído — Março 2026

---

## Tijolo 03 — Comunidades e Posts ✓
**Status**: Concluído — Março 2026

- [x] Listagem real de comunidades em `/comunidades`
- [x] Criação de novas comunidades por usuários autenticados
- [x] Slugs normalizados ( territoriais e únicos )
- [x] Feed de posts real dentro de cada comunidade
- [x] Autores e criadores vinculados ao perfil real
- [x] RLS validado para escrita apenas de membros autenticados
- [x] UI funcional "fria" para o circuito social básico

---


## Tijolo 04  Debate Comunitrio e Comentrios 
**Status:** Concludo  Maro 2026

- [x] Comentrios funcionais em posts de comunidade
- [x] Threading simples (2 nveis)
- [x] Leitura pblica e escrita autenticada
- [x] UI enxuta, sem likes, reações, wiki, upload ou moderao avanada

**Por que debate antes de wiki?**
O Nika prioriza o debate comunitrio porque a memria estruturada (wiki/acervo) s faz sentido quando h troca real entre pessoas. Comentrios e discusses so o ncleo do circuito social, validando a necessidade de memria coletiva.

---

## Tijolo 05  Aes Comunitrias e Comentrios

---


## Tijolo 05 — Ações Comunitárias e Comentários
**Escopo previsto**

- [ ] Sistema de `reactions_as_actions` (amplify, challenge, solidarity)
- [ ] UI de ação: escolha semântica em vez de "like"
- [ ] Comentários (threading) em posts e páginas do acervo
- [ ] Editar perfil (nome, bio)

---

## Tijolo 06 — Acervo Colaborativo
**Entregue:**
- Páginas de acervo versionadas (`knowledge_pages`, `knowledge_page_revisions`)
- Edição aberta para qualquer autenticado
- Histórico de revisões visível
- Vínculo opcional com comunidade
- UI Next.js para criar, editar, listar, ver histórico
- Navegação integrada

**Decisões:**
- Permissão aberta: qualquer autenticado pode editar
- Sem moderação/editorial neste tijolo

**Próximos passos (adiados):**
- Moderação/editorial
- Upload de arquivos
- Comentários em páginas
- Visualização de diff entre revisões
- Automação de notificações

---

## Tijolo 07 — PWA Avançado e Offline

---

## Tijolo 07 — Hub e Federação Inicial
