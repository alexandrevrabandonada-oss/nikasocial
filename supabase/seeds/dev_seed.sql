-- ============================================================================
-- Nika – Seed de dados para desenvolvimento
-- Execute no SQL Editor do Supabase:
-- https://supabase.com/dashboard/project/nvmdszymrtacfehdynpg/sql/new
--
-- ATENÇÃO: Crie uma conta real via /cadastrar primeiro,
-- então substitua SEU_USER_ID pelo UUID do usuário criado.
-- Você encontra o UUID em: Authentication > Users
-- ============================================================================

-- 1. Primeiro crie sua conta via /cadastrar ou /entrar
-- 2. Copie seu UUID de: Authentication > Users no dashboard
-- 3. Substitua <SEU_USER_ID> abaixo pelo UUID real

-- Verificar se seu profile foi criado automaticamente:
-- SELECT * FROM profiles;

-- Criar uma comunidade de exemplo (substitua o author_id):
-- INSERT INTO communities (slug, name, description, created_by)
-- VALUES (
--   'tecnologia-livre',
--   'Tecnologia Livre',
--   'Software livre, hardware aberto e soberania digital.',
--   '<SEU_USER_ID>'
-- );

-- Criar um post de exemplo:
-- INSERT INTO posts (community_id, author_id, title, body, post_type)
-- VALUES (
--   (SELECT id FROM communities WHERE slug = 'tecnologia-livre'),
--   '<SEU_USER_ID>',
--   'Bem-vindos à comunidade',
--   'Este é o primeiro post da comunidade. O Nika está no ar.',
--   'text'
-- );

-- Consultar dados:
SELECT 'profiles' as tabela, COUNT(*) as total FROM profiles
UNION ALL
SELECT 'communities', COUNT(*) FROM communities
UNION ALL
SELECT 'posts', COUNT(*) FROM posts
UNION ALL
SELECT 'comments', COUNT(*) FROM comments
UNION ALL
SELECT 'reactions_as_actions', COUNT(*) FROM reactions_as_actions
UNION ALL
SELECT 'knowledge_pages', COUNT(*) FROM knowledge_pages
UNION ALL
SELECT 'project_links', COUNT(*) FROM project_links;
