"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface AcervoFormProps {
  page?: { id: string; slug: string; title?: string; summary?: string; body_current?: string; community_id?: string; last_edited_by?: string } // undefined para criação, objeto para edição
  communities: { id: string; name: string }[]
  onSuccess: (slug: string) => void
}

export default function AcervoForm({ page, communities, onSuccess }: AcervoFormProps) {
  const [title, setTitle] = useState(page?.title || '')
  const [summary, setSummary] = useState(page?.summary || '')
  const [body, setBody] = useState(page?.body_current || '')
  const [communityId, setCommunityId] = useState(page?.community_id || '')
  const [editNote, setEditNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    if (page) {
      // Edição
      const { error } = await supabase.from('knowledge_pages').update({
        title, summary, body_current: body, community_id: communityId
      }).eq('id', page.id)
      if (!error) {
        // Criar revisão
        await supabase.from('knowledge_page_revisions').insert({
          page_id: page.id,
          editor_id: page.last_edited_by, // será sobrescrito pelo RLS
          title_snapshot: title,
          body_snapshot: body,
          summary_snapshot: summary,
          edit_note: editNote
        })
        onSuccess(page.slug)
      } else {
        setError('Erro ao salvar edição')
      }
    } else {
      // Criação
      const { data, error } = await supabase.from('knowledge_pages').insert({
        title, summary, body_current: body, community_id: communityId
      }).select('slug').single()
      if (!error && data) {
        onSuccess(data.slug)
      } else {
        setError('Erro ao criar página')
      }
    }
    setLoading(false)
  }

  return (
    <form className="acervo-form" onSubmit={handleSubmit}>
      <label>Título
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>Resumo
        <input value={summary} onChange={e => setSummary(e.target.value)} />
      </label>
      <label>Comunidade
        <select value={communityId} onChange={e => setCommunityId(e.target.value)}>
          <option value="">(Sem vínculo)</option>
          {communities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <label>Corpo
        <textarea value={body} onChange={e => setBody(e.target.value)} rows={10} required />
      </label>
      {page && (
        <label>Nota de edição (opcional)
          <input value={editNote} onChange={e => setEditNote(e.target.value)} />
        </label>
      )}
      <button type="submit" disabled={loading}>{page ? 'Salvar edição' : 'Criar página'}</button>
      {error && <div className="acervo-form-error">{error}</div>}
      <style>{`
        .acervo-form { display: flex; flex-direction: column; gap: var(--space-3); max-width: 600px; }
        .acervo-form label { font-size: var(--text-sm); font-weight: 600; }
        .acervo-form input, .acervo-form textarea, .acervo-form select { width: 100%; font-size: var(--text-base); margin-top: 2px; margin-bottom: 8px; }
        .acervo-form-error { color: var(--danger); font-size: var(--text-xs); }
      `}</style>
    </form>
  )
}
