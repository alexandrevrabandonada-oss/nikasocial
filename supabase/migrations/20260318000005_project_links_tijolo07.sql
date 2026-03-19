-- 20260318000005_project_links_tijolo07.sql
-- Incremental migration para ativar e ajustar project_links para o ecossistema multiapp (TIJOLO 07)

alter table public.project_links
  add column if not exists slug text unique,
  add column if not exists project_type text not null default 'pwa' check (project_type in ('pwa','site','ferramenta','mapa','acervo_externo','acao')),
  add column if not exists icon_name text,
  add column if not exists knowledge_page_id uuid references public.knowledge_pages(id) on delete set null,
  add column if not exists is_active boolean not null default true,
  add column if not exists created_by uuid references public.profiles(id) on delete restrict;

-- Renomear submitted_by para created_by se necessário
-- (Se já existir created_by, remover submitted_by)
do $$
begin
  if exists (select 1 from information_schema.columns where table_name='project_links' and column_name='submitted_by') then
    alter table public.project_links rename column submitted_by to created_by;
  end if;
end$$;

-- Remover colunas não mais usadas
alter table public.project_links drop column if exists logo_url;
alter table public.project_links drop column if exists link_type;
alter table public.project_links drop column if exists is_approved;

-- Garantir unicidade de slug
create unique index if not exists project_links_slug_idx on public.project_links(slug);

-- Atualizar triggers de updated_at se necessário
-- (já existe trigger project_links_updated_at)

-- Políticas RLS
-- Leitura pública apenas de projetos ativos
create or replace policy "Leitura pública de projetos ativos" on public.project_links for select using (is_active = true);

-- Criação apenas autenticada
create or replace policy "Usuário autenticado pode criar projeto" on public.project_links for insert with check (auth.uid() = created_by);

-- Update/delete restrito ao criador
create or replace policy "Só criador pode editar" on public.project_links for update using (auth.uid() = created_by);
create or replace policy "Só criador pode deletar" on public.project_links for delete using (auth.uid() = created_by);

-- Garantir integridade referencial dos vínculos
-- (já feito via FK community_id e knowledge_page_id)

comment on table public.project_links is
  'Links estruturados para projetos, PWAs, ferramentas, mapas, acervos e ações do ecossistema Nika. Vínculo opcional com comunidade e/ou página de acervo.';
