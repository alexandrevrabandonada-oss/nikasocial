# Estado da Nação – TIJOLO 06: Acervo Colaborativo

## Resumo
O Tijolo 06 implementou o acervo colaborativo do Nika, permitindo a criação, edição e versionamento de páginas de conhecimento coletivo, com leitura pública e edição aberta para qualquer usuário autenticado.

---

## Arquivos e Componentes Envolvidos

### Backend/Supabase
- **Migration:** supabase/migrations/20260318000004_knowledge_page_revisions_tijolo06.sql
  - Cria tabela `knowledge_page_revisions`
  - Renomeia `body` para `body_current` em `knowledge_pages`
- **Tabelas:**
  - `knowledge_pages`: páginas de acervo, com título, slug, corpo, vínculo opcional com comunidade
  - `knowledge_page_revisions`: histórico de revisões, com referência à página, autor, corpo, nota e timestamp
- **RLS/Policies:**
  - Leitura pública para ambas as tabelas
  - Escrita (criação/edição) permitida para qualquer usuário autenticado
  - Não há bloqueio por papel ou moderação

### Frontend/Next.js
- **Listagem:** apps/nika-web/src/app/acervo/page.tsx
- **Criação:** apps/nika-web/src/app/acervo/nova/page.tsx
- **Visualização:** apps/nika-web/src/app/acervo/[slug]/page.tsx
- **Edição:** apps/nika-web/src/app/acervo/[slug]/editar/page.tsx
- **Formulário:** apps/nika-web/src/components/acervo/AcervoForm.tsx
- **Navegação:** apps/nika-web/src/app/(app)/layout.tsx

---

## Fluxo de Uso
1. Qualquer usuário autenticado pode criar uma nova página de acervo.
2. Edições geram revisões automáticas, visíveis no histórico da página.
3. Leitura é sempre pública.
4. Vínculo com comunidade é opcional.

---

## Decisões de Autorização
- **Criação/Edição:** aberta para qualquer autenticado (sem moderação/editorial)
- **Leitura:** pública
- **RLS:** explícita nas policies do Supabase, documentada em arquitetura.md

---

## O que ficou adiado
- Moderação/editorial
- Upload de arquivos
- Comentários em páginas do acervo
- Visualização de diff entre revisões
- Automação de notificações

---

## Referências de Documentação
- docs/manifesto.md: racionalidade do acervo, diferença para timeline, visão de memória coletiva
- docs/arquitetura.md: domínio, tabelas, fluxo, decisões de permissão
- docs/roadmap.md: entregas, próximos passos e decisões

---

## Observações Finais
O acervo é o primeiro passo para a memória coletiva do Nika. O modelo privilegia simplicidade, abertura e versionamento, preparando terreno para recursos mais avançados em tijolos futuros.
