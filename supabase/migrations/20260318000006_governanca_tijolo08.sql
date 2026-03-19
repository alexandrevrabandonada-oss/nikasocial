-- 20260318000006_governanca_tijolo08.sql
-- Tabelas mínimas para governança e moderação leve (TIJOLO 08)

create table if not exists public.content_flags (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('post','comment','knowledge_page','project_link')),
  content_id uuid not null,
  reason text not null check (reason in ('spam','vandalismo','improprio','duplicado','quebrado')),
  note text,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  status text not null default 'open' check (status in ('open','reviewed','dismissed','restricted'))
);

create table if not exists public.moderation_events (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('post','comment','knowledge_page','project_link')),
  content_id uuid not null,
  action_type text not null check (action_type in ('hide','unhide','lock_edit','unlock_edit','archive','restore')),
  note text,
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('admin','moderator')),
  scope_type text not null check (scope_type in ('global','community')),
  community_id uuid references public.communities(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Indexes para busca rápida
create index if not exists content_flags_content_idx on public.content_flags(content_type, content_id);
create index if not exists moderation_events_content_idx on public.moderation_events(content_type, content_id);
create index if not exists user_roles_user_idx on public.user_roles(user_id);

-- RLS
alter table public.content_flags enable row level security;
alter table public.moderation_events enable row level security;
alter table public.user_roles enable row level security;

-- Policies
-- Flags: criar só autenticado, ler só admin/moderator
create or replace policy "Criar flag autenticado" on public.content_flags for insert with check (auth.uid() = created_by);
create or replace policy "Ler flags admin/moderator" on public.content_flags for select using (
  exists (
    select 1 from public.user_roles r
    where r.user_id = auth.uid() and r.role in ('admin','moderator')
  )
);

-- Moderação: criar evento só admin/moderator
create or replace policy "Criar evento só admin/moderator" on public.moderation_events for insert with check (
  exists (
    select 1 from public.user_roles r
    where r.user_id = auth.uid() and r.role in ('admin','moderator')
  )
);
create or replace policy "Ler eventos admin/moderator" on public.moderation_events for select using (
  exists (
    select 1 from public.user_roles r
    where r.user_id = auth.uid() and r.role in ('admin','moderator')
  )
);

-- Papéis: só admin pode criar admin global
create or replace policy "Criar papel autenticado" on public.user_roles for insert with check (
  auth.uid() = user_id or (
    (role = 'admin' and scope_type = 'global' and exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = 'admin' and r.scope_type = 'global'))
  )
);
create or replace policy "Ler papéis admin/moderator" on public.user_roles for select using (
  exists (
    select 1 from public.user_roles r
    where r.user_id = auth.uid() and r.role in ('admin','moderator')
  )
);
