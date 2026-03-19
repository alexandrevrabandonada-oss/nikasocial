-- 20260318000007_acervo_protecao_tijolo08.sql
-- Adiciona campo de trava mínima no acervo (TIJOLO 08)

alter table public.knowledge_pages
  add column if not exists is_locked boolean not null default false;

-- Regra: qualquer autenticado pode editar, mas admin/moderator pode travar página (lock_edit)
-- Se is_locked = true, só admin/moderator pode editar

-- Policy de update
create or replace policy "Editar página se não travada ou admin/moderator" on public.knowledge_pages for update using (
  (is_locked = false) or (
    is_locked = true and exists (
      select 1 from public.user_roles r where r.user_id = auth.uid() and r.role in ('admin','moderator')
    )
  )
);
