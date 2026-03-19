# Estado da Nação – Tijolo 05

## O que foi implementado
- Sistema de ações comunitárias em posts (substituindo likes)
- 5 tipos de ação: apoiar, confirmar, replicar, convocar, acervo
- Toggle de ação por usuário/tipo/post
- Contadores públicos por tipo de ação
- Barra de ações em cada post na página da comunidade
- Respeito ao escopo: sem ranking, sem ações em comentários, sem gamificação

## Schema/migration ajustados
- Migration incremental para restringir action_type aos 5 tipos obrigatórios
- Constraint para garantir target_type = 'post' neste tijolo

## Policies ajustadas
- Leitura pública
- Escrita apenas por usuário autenticado
- Usuário só pode criar/remover suas próprias ações
- Sem update (ações são imutáveis)

## Fluxo de toggle da ação
- Se usuário não marcou a ação: cria
- Se já marcou: remove
- Não permite duplicidade por tipo/usuário/post

## Lista das ações disponíveis
- apoiar: demonstra suporte comunitário
- confirmar: reconhece/valida o conteúdo
- replicar: indica que deve circular
- convocar: chama para mobilização
- acervo: sugere para a memória coletiva

## Como os contadores são calculados
- Query agregada por tipo de ação e post
- UI exibe contadores e destaca ações já marcadas pelo usuário

## Limitações assumidas
- Sem ações em comentários
- Sem ranking, score ou reputação individual
- Sem animações ou polimento avançado
- Sem busca, admin, federação, wiki, upload ou moderação

## Pendências
- Ações em comentários
- Wiki/acervo estruturado
- Busca e navegação avançada
- Moderação e federação
- Edição/deleção de ações

## Riscos
- Crescimento do volume pode exigir otimização de queries
- Sem moderação, pode haver uso indevido das ações
- Sem feedback visual avançado, pode gerar dúvidas de UX

## Próximos 5 tijolos sugeridos
1. Ações em comentários
2. Wiki/acervo colaborativo
3. Busca e navegação avançada
4. Moderação e reputação comunitária
5. PWA/offline e federação inicial

## Comandos de validação
- Abrir `/comunidades/[slug]` deslogado: ver contadores, sem interação
- Logar e acionar/desacionar cada ação em um post
- Ver atualização da UI após toggle
- Tentar duplicar ação: bloqueado
- Tentar interagir deslogado: bloqueado

---

Para dúvidas, consulte os arquivos:
- `apps/nika-web/src/components/communities/PostActions.tsx`
- `apps/nika-web/src/app/(app)/comunidades/[slug]/page.tsx`
- `supabase/migrations/20260318000003_reactions_actions_tijolo05.sql`
