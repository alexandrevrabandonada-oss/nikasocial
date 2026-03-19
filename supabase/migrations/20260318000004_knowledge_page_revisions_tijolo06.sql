-- Migration Tijolo 06 – Acervo colaborativo e revisões

-- 1. Renomear campo body para body_current em knowledge_pages
ALTER TABLE public.knowledge_pages
  RENAME COLUMN body TO body_current;

-- 2. Criar tabela de revisões
CREATE TABLE IF NOT EXISTS public.knowledge_page_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES public.knowledge_pages(id) ON DELETE CASCADE,
  editor_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title_snapshot text NOT NULL,
  body_snapshot text NOT NULL,
  summary_snapshot text,
  edit_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.knowledge_page_revisions IS
  'Revisões de páginas do acervo colaborativo. Cada edição relevante gera um snapshot.';

-- 3. RLS: leitura pública, escrita autenticada
ALTER TABLE public.knowledge_page_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Revisões são visíveis publicamente"
  ON public.knowledge_page_revisions FOR SELECT USING (true);

CREATE POLICY "Usuário autenticado pode criar revisão"
  ON public.knowledge_page_revisions FOR INSERT WITH CHECK (auth.uid() = editor_id);
