/**
 * @nika/sdk – Cliente Supabase base
 *
 * IMPORTANTE: Este módulo expõe um client-side Supabase client.
 * Para SSR/Server Components use o helper específico do Next.js em nika-web.
 *
 * Variáveis de ambiente obrigatórias:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Nunca hardcode credenciais aqui.
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

function getEnvVar(name: string): string {
  // Suporte a Next.js (NEXT_PUBLIC_*) e Vite (VITE_*)
  const value =
    (typeof process !== 'undefined' && process.env[name]) ||
    (typeof import.meta !== 'undefined' && (import.meta as Record<string, unknown>).env
      ? ((import.meta as Record<string, Record<string, string>>).env[name.replace('NEXT_PUBLIC_', 'VITE_')] ?? '')
      : '')

  if (!value) {
    throw new Error(
      `[nika/sdk] Variável de ambiente obrigatória não definida: ${name}. ` +
        `Verifique seu .env.local e as configurações do ambiente de deploy.`
    )
  }
  return value
}

export function createNikaClient() {
  const url = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  const key = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return createClient<Database>(url, key)
}

// Singleton lazy para uso client-side
let _client: ReturnType<typeof createNikaClient> | null = null

export function getNikaClient() {
  if (!_client) {
    _client = createNikaClient()
  }
  return _client
}
