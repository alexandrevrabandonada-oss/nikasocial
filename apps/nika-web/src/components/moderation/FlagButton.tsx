"use client"
import { useState } from 'react'
import { flagContent } from '@/lib/moderation/actions'

const REASONS = [
  { value: 'spam', label: 'Spam' },
  { value: 'vandalismo', label: 'Vandalismo' },
  { value: 'improprio', label: 'Conteúdo impróprio' },
  { value: 'duplicado', label: 'Duplicado' },
  { value: 'quebrado', label: 'Quebrado/URL inválida' },
]

export function FlagButton({ content_type, content_id }: { content_type: 'knowledge_page' | 'project_link', content_id: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('spam')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleFlag(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await flagContent({ content_type, content_id, reason, note })
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Erro ao sinalizar')
    } finally {
      setLoading(false)
    }
  }

  if (done) return <span className="text-green-700 text-xs">Sinalizado!</span>

  return (
    <div className="inline-block ml-2">
      <button type="button" className="text-xs text-red-600 underline" onClick={() => setOpen(!open)}>
        Sinalizar
      </button>
      {open && (
        <form onSubmit={handleFlag} className="bg-white border p-2 rounded shadow mt-2 z-10 absolute">
          <label className="block text-xs font-medium mb-1">Motivo</label>
          <select value={reason} onChange={e => setReason(e.target.value)} className="input mb-2">
            {REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <textarea value={note} onChange={e => setNote(e.target.value)} className="input mb-2" placeholder="Nota (opcional)" />
          {error && <div className="text-red-600 text-xs mb-1">{error}</div>}
          <button type="submit" className="btn btn-xs btn-danger" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
        </form>
      )}
    </div>
  )
}
