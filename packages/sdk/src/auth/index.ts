/**
 * @nika/sdk – Auth Helpers
 *
 * Helpers reutilizáveis de autenticação para apps Nika.
 * Funciona tanto com Next.js (NEXT_PUBLIC_*) quanto Vite (VITE_*).
 *
 * Uso em Next.js: import da lib/supabase/server.ts (usa @supabase/ssr)
 * Uso em Vite: use createNikaClient() deste módulo
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

export type NikaUser = Database['public']['Tables']['profiles']['Row']
export type NikaClient = SupabaseClient<Database>

/**
 * Busca o profile do usuário autenticado.
 * Retorna null se não autenticado ou se profile não existe ainda.
 */
export async function getCurrentProfile(
  client: NikaClient
): Promise<NikaUser | null> {
  const { data: { user } } = await client.auth.getUser()
  if (!user) return null

  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.warn('[nika/sdk] profile não encontrado para user:', user.id)
    return null
  }

  return data
}

/**
 * Verifica se há sessão ativa.
 * Use para guards simples em Client Components.
 */
export async function isAuthenticated(client: NikaClient): Promise<boolean> {
  const { data: { user } } = await client.auth.getUser()
  return user !== null
}
