"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProjectLinkAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuário não autenticado')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const url = formData.get('url') as string
  const project_type = formData.get('project_type') as string
  const description = formData.get('description') as string
  const community_id = formData.get('community_id') as string
  const knowledge_page_id = formData.get('knowledge_page_id') as string

  const { error } = await supabase.from('project_links').insert({
    title,
    slug,
    url,
    project_type,
    description,
    community_id: community_id || null,
    knowledge_page_id: knowledge_page_id || null,
    is_active: true,
    created_by: user.id,
  })
  if (error) throw error
  revalidatePath('/projetos')
}
