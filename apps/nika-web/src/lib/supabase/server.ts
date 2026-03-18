/**
 * Supabase SSR Client – nika-web
 *
 * Helpers específicos do Next.js para autenticação server-side.
 * Baseado em @supabase/ssr – gerencia cookies automaticamente.
 *
 * Uso:
 * - createClient() → dentro de Server Components e Route Handlers
 * - Nunca use este arquivo em Client Components – use o SDK client-side
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@nika/sdk/types'

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      '[nika-web] NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios. ' +
        'Verifique seu .env.local.'
    )
  }

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cookieStore.set(name, value, options as any)
          )
        } catch {
          // setAll pode falhar em Server Components read-only
          // É seguro ignorar – middleware cuida da renovação de sessão
        }
      },
    },
  })
}
