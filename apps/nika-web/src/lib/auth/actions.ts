'use server'

/**
 * Server Actions de Autenticação – Nika Web
 *
 * Estratégia: email + senha (Supabase Auth nativo)
 * Razão: mais estável no Vercel que magic link (sem dependência de SMTP/domínio).
 * Magic link pode ser adicionado opcionalmente no futuro.
 *
 * Todas as actions são server-only. Nenhuma credencial vai para o cliente.
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─── Login com email + senha ─────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/entrar?error=Preencha email e senha')
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const msg = encodeURIComponent(
      error.message === 'Invalid login credentials'
        ? 'Email ou senha incorretos'
        : error.message
    )
    redirect(`/entrar?error=${msg}`)
  }

  revalidatePath('/', 'layout')
  redirect('/explorar')
}

// ─── Cadastro com email + senha ───────────────────────────────────────────────

export async function signupAction(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string

  if (!email || !password || !username) {
    redirect('/cadastrar?error=Preencha todos os campos')
  }

  if (password.length < 8) {
    redirect('/cadastrar?error=Senha precisa ter pelo menos 8 caracteres')
  }

  // Criar conta no Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, display_name: username },
    },
  })

  if (error) {
    const msg = encodeURIComponent(error.message)
    redirect(`/cadastrar?error=${msg}`)
  }

  // Se confirmação de email estiver desativada, usuário já tem sessão
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/explorar')
  }

  // Se confirmação de email estiver ativa, redireciona para aviso
  redirect('/entrar?info=Verifique seu email para confirmar o cadastro')
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
