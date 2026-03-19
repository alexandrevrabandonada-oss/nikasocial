"use client"
import { useState } from 'react'
import { createProjectLink } from '@/lib/projects/actions'
import { useRouter } from 'next/navigation'

const PROJECT_TYPES = [
  { value: 'pwa', label: 'PWA' },
  { value: 'site', label: 'Site' },
  { value: 'ferramenta', label: 'Ferramenta' },
  { value: 'mapa', label: 'Mapa' },
  { value: 'acervo_externo', label: 'Acervo Externo' },
  { value: 'acao', label: 'Ação' },
]

export function ProjectForm() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    url: '',
    project_type: 'pwa',
    description: '',
    community_id: '',
    knowledge_page_id: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createProjectLink(form)
      router.push('/projetos')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar projeto')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Título</label>
        <input name="title" value={form.title} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="block font-medium">Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="block font-medium">URL</label>
        <input name="url" value={form.url} onChange={handleChange} required className="input" type="url" />
      </div>
      <div>
        <label className="block font-medium">Tipo</label>
        <select name="project_type" value={form.project_type} onChange={handleChange} className="input">
          {PROJECT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Descrição</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="input" />
      </div>
      <div>
        <label className="block font-medium">Vínculo com comunidade (opcional)</label>
        <input name="community_id" value={form.community_id} onChange={handleChange} className="input" />
      </div>
      <div>
        <label className="block font-medium">Vínculo com página de acervo (opcional)</label>
        <input name="knowledge_page_id" value={form.knowledge_page_id} onChange={handleChange} className="input" />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Salvando...' : 'Cadastrar'}</button>
    </form>
  )
}
