"use client"

import { createProjectLinkAction } from '@/lib/projects/actions'

const PROJECT_TYPES = [
  { value: 'pwa', label: 'PWA' },
  { value: 'site', label: 'Site' },
  { value: 'ferramenta', label: 'Ferramenta' },
  { value: 'mapa', label: 'Mapa' },
  { value: 'acervo_externo', label: 'Acervo Externo' },
  { value: 'acao', label: 'Ação' },
]

export function ProjectForm() {
  return (
    <form action={createProjectLinkAction} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Título</label>
        <input name="title" required className="input" />
      </div>
      <div>
        <label className="block font-medium">Slug</label>
        <input name="slug" required className="input" />
      </div>
      <div>
        <label className="block font-medium">URL</label>
        <input name="url" required className="input" type="url" />
      </div>
      <div>
        <label className="block font-medium">Tipo</label>
        <select name="project_type" className="input">
          {PROJECT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Descrição</label>
        <textarea name="description" className="input" />
      </div>
      <div>
        <label className="block font-medium">Vínculo com comunidade (opcional)</label>
        <input name="community_id" className="input" />
      </div>
      <div>
        <label className="block font-medium">Vínculo com página de acervo (opcional)</label>
        <input name="knowledge_page_id" className="input" />
      </div>
      <button type="submit" className="btn btn-primary">Cadastrar</button>
    </form>
  )
}
