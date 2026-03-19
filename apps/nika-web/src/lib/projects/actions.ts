import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function listProjectLinks() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('project_links')
    .select('*, community:community_id (id, name, slug)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getProjectLinkBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('project_links')
    .select('*, community:community_id (id, name, slug), knowledge_page:knowledge_page_id (id, title, slug)')
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function createProjectLink(form: any) {
  const supabase = createClient()
  const { error } = await supabase.from('project_links').insert({
    ...form,
    is_active: true,
    created_by: (await supabase.auth.getUser()).data.user?.id,
  })
  if (error) throw error
  revalidatePath('/projetos')
}
