'use server'

import { createClient } from '@/lib/supabase/server'

export async function flagContent({ content_type, content_id, reason, note }: {
  content_type: 'knowledge_page' | 'project_link',
  content_id: string,
  reason: 'spam' | 'vandalismo' | 'improprio' | 'duplicado' | 'quebrado',
  note?: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('content_flags').insert({
    content_type, content_id, reason, note
  })
  if (error) throw error
}

export async function listOpenFlags() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('content_flags')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function moderateContent({ content_type, content_id, action_type, note }: {
  content_type: 'knowledge_page' | 'project_link',
  content_id: string,
  action_type: 'hide' | 'unhide' | 'lock_edit' | 'unlock_edit' | 'archive' | 'restore',
  note?: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('moderation_events').insert({
    content_type, content_id, action_type, note
  })
  if (error) throw error
}
