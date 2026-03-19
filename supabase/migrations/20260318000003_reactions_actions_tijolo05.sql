-- Migration Tijolo 05 – Ajuste de actions comunitárias

-- 1. Atualizar tipos permitidos de action_type
ALTER TABLE public.reactions_as_actions
  DROP CONSTRAINT IF EXISTS reactions_as_actions_action_type_check;

ALTER TABLE public.reactions_as_actions
  ADD CONSTRAINT reactions_as_actions_action_type_check
  CHECK (action_type IN ('apoiar', 'confirmar', 'replicar', 'convocar', 'acervo'));

-- 2. Garantir que target_type só pode ser 'post' neste tijolo
ALTER TABLE public.reactions_as_actions
  DROP CONSTRAINT IF EXISTS reactions_as_actions_target_type_check;

ALTER TABLE public.reactions_as_actions
  ADD CONSTRAINT reactions_as_actions_target_type_check
  CHECK (target_type = 'post');

-- 3. (Opcional) Adicionar comentário explicativo
COMMENT ON CONSTRAINT reactions_as_actions_action_type_check ON public.reactions_as_actions IS
  'Apenas ações comunitárias permitidas no Tijolo 05: apoiar, confirmar, replicar, convocar, acervo.';

COMMENT ON CONSTRAINT reactions_as_actions_target_type_check ON public.reactions_as_actions IS
  'No Tijolo 05, ações só podem ser aplicadas a posts.';
