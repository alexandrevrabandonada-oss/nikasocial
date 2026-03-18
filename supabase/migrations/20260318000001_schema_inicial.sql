-- ============================================================================
-- Nika – Migration 001: Schema inicial de domínio
-- Projeto: nvmdszymrtacfehdynpg
-- Data: 2026-03-18
-- ============================================================================
-- Execute este script no SQL Editor do Supabase:
-- https://supabase.com/dashboard/project/nvmdszymrtacfehdynpg/sql/new
-- ============================================================================


-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- ─── PROFILES ────────────────────────────────────────────────────────────────
-- Extensão pública de auth.users
-- Criada automaticamente via trigger ao cadastrar usuário

create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  display_name  text,
  bio           text,
  avatar_url    text,
  website_url   text,
  is_verified   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.profiles is
  'Perfil público de cada usuário autenticado. Extensão de auth.users.';

comment on column public.profiles.is_verified is
  'Verificação pela comunidade – sem relação com dinheiro ou status comercial.';

-- Trigger para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Trigger para criar profile automaticamente ao cadastrar
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'username',
      split_part(new.email, '@', 1)
    ),
    coalesce(
      new.raw_user_meta_data->>'display_name',
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ─── COMMUNITIES ─────────────────────────────────────────────────────────────

create table if not exists public.communities (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  avatar_url    text,
  is_public     boolean not null default true,
  member_count  integer not null default 0,
  created_by    uuid not null references public.profiles(id) on delete restrict,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.communities is
  'Espaços de organização coletiva. Sem dono permanente – fundador pode ser substituído por consenso (implementação futura).';

create or replace trigger communities_updated_at
  before update on public.communities
  for each row execute function public.handle_updated_at();

-- Index para busca por slug
create index if not exists communities_slug_idx on public.communities(slug);
create index if not exists communities_created_by_idx on public.communities(created_by);


-- ─── POSTS ───────────────────────────────────────────────────────────────────

create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  community_id  uuid not null references public.communities(id) on delete cascade,
  author_id     uuid not null references public.profiles(id) on delete restrict,
  title         text,
  body          text,
  post_type     text not null default 'text'
                  check (post_type in ('text', 'link', 'image', 'knowledge_ref')),
  link_url      text,
  image_url     text,
  is_pinned     boolean not null default false,
  is_removed    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.posts is
  'Publicações nas comunidades. Suporta texto, link, imagem e referência a páginas do acervo.';

comment on column public.posts.is_removed is
  'Remoção pela comunidade – não apaga o conteúdo do banco, apenas oculta. Preserva histórico.';

create or replace trigger posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

create index if not exists posts_community_id_idx on public.posts(community_id);
create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_created_at_idx on public.posts(created_at desc);


-- ─── COMMENTS ────────────────────────────────────────────────────────────────

create table if not exists public.comments (
  id                   uuid primary key default gen_random_uuid(),
  post_id              uuid references public.posts(id) on delete cascade,
  knowledge_page_id    uuid, -- FK adicionada após criar knowledge_pages
  parent_id            uuid references public.comments(id) on delete cascade,
  author_id            uuid not null references public.profiles(id) on delete restrict,
  body                 text not null,
  is_removed           boolean not null default false,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint comment_has_target check (
    (post_id is not null) or (knowledge_page_id is not null)
  )
);

comment on table public.comments is
  'Comentários em posts e páginas do acervo. Suporte a threading via parent_id.';

create or replace trigger comments_updated_at
  before update on public.comments
  for each row execute function public.handle_updated_at();

create index if not exists comments_post_id_idx on public.comments(post_id);
create index if not exists comments_author_id_idx on public.comments(author_id);
create index if not exists comments_parent_id_idx on public.comments(parent_id);


-- ─── REACTIONS AS ACTIONS ────────────────────────────────────────────────────
-- NÚCLEO FILOSÓFICO DO PRODUTO
--
-- Reações no Nika NÃO são likes.
-- São ações comunitárias com semântica própria.
-- Cada ação tem um tipo que expressa o modo de participação.
--
-- Tipos disponíveis:
--   amplify    → quero que mais pessoas vejam
--   build_upon → construí algo a partir disso
--   challenge  → discordo e quero debater
--   translate  → quero tornar acessível para outro grupo
--   archive    → tem valor histórico para o coletivo
--   solidarity → manifesto apoio a quem criou
--
-- Ações são imutáveis (sem UPDATE). Apenas INSERT e DELETE.
-- Sem contador público de aprovação – engajamento é participação.

create table if not exists public.reactions_as_actions (
  id           uuid primary key default gen_random_uuid(),
  actor_id     uuid not null references public.profiles(id) on delete cascade,
  target_type  text not null check (target_type in ('post', 'comment', 'knowledge_page')),
  target_id    uuid not null,
  action_type  text not null check (
    action_type in ('amplify', 'build_upon', 'challenge', 'translate', 'archive', 'solidarity')
  ),
  note         text,
  created_at   timestamptz not null default now(),
  -- Um ator só pode ter uma ação do mesmo tipo no mesmo alvo
  unique (actor_id, target_type, target_id, action_type)
);

comment on table public.reactions_as_actions is
  'Ações comunitárias em conteúdos. NÃO são likes. '
  'Cada tipo de ação tem semântica própria: amplify, build_upon, challenge, translate, archive, solidarity. '
  'Ações são imutáveis – apenas INSERT e DELETE. Sem UPDATE.';

create index if not exists reactions_target_idx
  on public.reactions_as_actions(target_type, target_id);
create index if not exists reactions_actor_idx
  on public.reactions_as_actions(actor_id);


-- ─── KNOWLEDGE PAGES ─────────────────────────────────────────────────────────

create table if not exists public.knowledge_pages (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  body            text not null default '',
  summary         text,
  community_id    uuid references public.communities(id) on delete set null,
  created_by      uuid not null references public.profiles(id) on delete restrict,
  last_edited_by  uuid references public.profiles(id) on delete set null,
  is_published    boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.knowledge_pages is
  'Base de conhecimento colaborativa (wiki). '
  'Sem neutralidade imposta – ponto de vista é explícito e contextualizado. '
  'Versioning completo será implementado em fase posterior.';

create or replace trigger knowledge_pages_updated_at
  before update on public.knowledge_pages
  for each row execute function public.handle_updated_at();

-- Adicionar FK de comments.knowledge_page_id agora que a tabela existe
alter table public.comments
  add constraint comments_knowledge_page_id_fkey
  foreign key (knowledge_page_id)
  references public.knowledge_pages(id)
  on delete cascade;

create index if not exists knowledge_pages_slug_idx on public.knowledge_pages(slug);
create index if not exists knowledge_pages_community_id_idx
  on public.knowledge_pages(community_id);


-- ─── PROJECT LINKS ───────────────────────────────────────────────────────────
-- Hub de projetos externos conectados ao Nika.
--
-- NOTA SOBRE FEDERAÇÃO:
-- Federação real via ActivityPub está planejada para fase posterior.
-- Por ora, project_links são conexões curadas manualmente.
-- Esta tabela é o ponto de entrada do ecossistema multiapp.

create table if not exists public.project_links (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text,
  url           text not null,
  logo_url      text,
  link_type     text not null default 'other'
                  check (link_type in ('pwa', 'tool', 'repo', 'community', 'other')),
  community_id  uuid references public.communities(id) on delete set null,
  submitted_by  uuid not null references public.profiles(id) on delete restrict,
  is_approved   boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.project_links is
  'Hub de projetos externos conectados ao Nika. '
  'O Nika funciona como hub que conversa com outros PWAs e coletivos. '
  'Federação real via ActivityPub está planejada para fase posterior.';

create or replace trigger project_links_updated_at
  before update on public.project_links
  for each row execute function public.handle_updated_at();

create index if not exists project_links_submitted_by_idx
  on public.project_links(submitted_by);
create index if not exists project_links_community_id_idx
  on public.project_links(community_id);


-- ─── RLS – Row Level Security ─────────────────────────────────────────────────
-- Ativa RLS em todas as tabelas públicas.
-- Políticas iniciais: leitura pública, escrita autenticada.

alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.reactions_as_actions enable row level security;
alter table public.knowledge_pages enable row level security;
alter table public.project_links enable row level security;


-- PROFILES
create policy "Perfis são visíveis publicamente"
  on public.profiles for select using (true);

create policy "Usuário pode editar seu próprio perfil"
  on public.profiles for update using (auth.uid() = id);


-- COMMUNITIES
create policy "Comunidades públicas são visíveis a todos"
  on public.communities for select using (is_public = true);

create policy "Membros autenticados pode ver comunidades privadas que pertencem"
  on public.communities for select using (auth.uid() is not null);

create policy "Usuário autenticado pode criar comunidade"
  on public.communities for insert with check (auth.uid() = created_by);

create policy "Fundador pode editar a comunidade"
  on public.communities for update using (auth.uid() = created_by);


-- POSTS
create policy "Posts de comunidades públicas são visíveis"
  on public.posts for select
  using (
    exists (
      select 1 from public.communities c
      where c.id = community_id and c.is_public = true
    )
    and is_removed = false
  );

create policy "Usuário autenticado pode criar post"
  on public.posts for insert with check (auth.uid() = author_id);

create policy "Autor pode editar seu post"
  on public.posts for update using (auth.uid() = author_id);


-- COMMENTS
create policy "Comentários de posts visíveis são visíveis"
  on public.comments for select using (is_removed = false);

create policy "Usuário autenticado pode comentar"
  on public.comments for insert with check (auth.uid() = author_id);

create policy "Autor pode editar seu comentário"
  on public.comments for update using (auth.uid() = author_id);


-- REACTIONS AS ACTIONS
create policy "Ações comunitárias são visíveis publicamente"
  on public.reactions_as_actions for select using (true);

create policy "Usuário autenticado pode registrar ação"
  on public.reactions_as_actions for insert with check (auth.uid() = actor_id);

create policy "Usuário pode remover sua própria ação"
  on public.reactions_as_actions for delete using (auth.uid() = actor_id);

-- Sem policy de UPDATE – ações são imutáveis por design


-- KNOWLEDGE PAGES
create policy "Páginas publicadas são visíveis publicamente"
  on public.knowledge_pages for select using (is_published = true);

create policy "Usuário autenticado pode criar página"
  on public.knowledge_pages for insert with check (auth.uid() = created_by);

create policy "Qualquer autenticado pode editar página publicada"
  on public.knowledge_pages for update using (auth.uid() is not null);


-- PROJECT LINKS
create policy "Links aprovados são visíveis publicamente"
  on public.project_links for select using (is_approved = true);

create policy "Usuário autenticado pode submeter link"
  on public.project_links for insert with check (auth.uid() = submitted_by);


-- ============================================================================
-- FIM DA MIGRATION 001
-- ============================================================================
