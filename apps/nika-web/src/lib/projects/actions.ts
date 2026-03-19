'use server'

import { createClient } from '@/lib/supabase/server'

export async function listProjectLinks() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('project_links')
    .select('*, community:community_id (id, name, slug)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getProjectLinkBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('project_links')
    .select('*, community:community_id (id, name, slug), knowledge_page:knowledge_page_id (id, title, slug)')
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw error
  return data
}

