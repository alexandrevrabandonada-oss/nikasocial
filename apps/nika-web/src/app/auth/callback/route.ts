/**
 * Auth Callback – Nika Web
 *
 * Processa o código de troca de sessão após:
 * - Confirmação de email (signup)
 * - Magic link (se ativado futuramente)
 * - OAuth providers
 *
 * Supabase redireciona para /auth/callback?code=...
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/explorar'
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // Se houver erro de OAuth/callback
  if (error) {
    const msg = encodeURIComponent(errorDescription ?? error)
    return NextResponse.redirect(`${origin}/entrar?error=${msg}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/entrar?error=Link+inválido+ou+expirado`)
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const response = NextResponse.redirect(`${origin}${next}`)

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          response.cookies.set(name, value, options as any)
        )
      },
    },
  })

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    const msg = encodeURIComponent(exchangeError.message)
    return NextResponse.redirect(`${origin}/entrar?error=${msg}`)
  }

  return response
}
