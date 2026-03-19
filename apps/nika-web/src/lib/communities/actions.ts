'use server'

/**
 * Server Actions para Comunidades – Nika Web
 *
 * Gerencia a criação de espaços coletivos e a publicação de conteúdos.
 * Segue a filosofia de "comunidade como unidade política".
 */

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// ─── Criar Comunidade ────────────────────────────────────────────────────────

export async function createCommunityAction(formData: FormData) {
  const supabase = await createClient()

  // Sessão obrigatória
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/entrar')

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const rawSlug = formData.get('slug') as string

  // Normalização do slug
  const slug = rawSlug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (!name || name.length < 3 || !slug) {
    redirect('/comunidades/nova?error=Nome+ou+slug+inválidos')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('communities') as any)
    .insert({
      name,
      slug,
      description,
      created_by: user.id
    })
    .select('slug')
    .single()

  if (error) {
    console.error('[createCommunityAction] erro:', error)
    if (error.code === '23505') {
       redirect('/comunidades/nova?error=Este+slug+já+está+em+uso')
    }
    redirect(`/comunidades/nova?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/comunidades')
  redirect(`/comunidades/${data.slug}`)
}

// ─── Criar Post ──────────────────────────────────────────────────────────────

export async function createPostAction(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/entrar')

  const communityId = formData.get('community_id') as string
  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const communitySlug = formData.get('community_slug') as string

  if (!communityId || !body) {
    redirect(`/comunidades/${communitySlug}?error=Conteúdo+é+obrigatório`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('posts') as any)
    .insert({
      community_id: communityId,
      author_id: user.id,
      title: title || null,
      body,
      post_type: 'text' // Padrão Tijolo 03
    })

  if (error) {
    console.error('[createPostAction] erro:', error)
    redirect(`/comunidades/${communitySlug}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath(`/comunidades/${communitySlug}`)
  redirect(`/comunidades/${communitySlug}`)
}
