-- ============================================================================
-- Nika – Migration 002: Ajustes pós-Tijolo 02
-- Confirmar configurações de auth no Supabase Dashboard:
-- 1. Authentication > Email > "Confirm email" = DESATIVADO (para dev rápido)
--    OU configurar SMTP para envio de emails de confirmação.
-- 2. Site URL = http://localhost:3000 (dev) / URL do Vercel (prod)
-- 3. Redirect URLs adicionar: https://seu-projeto.vercel.app/auth/callback
-- ============================================================================
-- Este arquivo serve de referência. O schema principal já foi criado
-- na migration 001. Execute aqui apenas se precisar corrigir algo.
-- ============================================================================

-- Verificar se as tabelas existem (diagnóstico):
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verificar triggers de auth:
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  OR event_object_schema = 'auth';
