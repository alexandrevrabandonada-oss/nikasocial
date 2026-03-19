import type { Metadata } from 'next'
import { createCommunityAction } from '@/lib/communities/actions'

export const metadata: Metadata = { title: 'Nova Comunidade' }

interface PageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function NovaComunidadePage({ searchParams }: PageProps) {
  const params = await searchParams
  const error = params.error

  return (
    <main className="form-page">
      <div className="form-page__card">
        <header className="form-page__header">
          <span className="form-label">◈ organização</span>
          <h1 className="form-title">Iniciar Coletivo</h1>
          <p className="form-desc">Defina o nome e o território digital da sua nova comunidade.</p>
        </header>

        {error && (
          <div className="form-alert form-alert--error">
            <span>⚠</span> {decodeURIComponent(error)}
          </div>
        )}

        <form action={createCommunityAction} className="form-stack">
          <div className="form-field">
            <label htmlFor="name" className="form-field__label">Nome da Comunidade</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Software Livre BH"
              className="form-input"
              required
              minLength={3}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="slug" className="form-field__label">Slug (URL)</label>
            <div className="slug-input-wrapper">
              <span className="slug-prefix">@nika/comunidades/</span>
              <input
                id="slug"
                name="slug"
                type="text"
                placeholder="nome-da-comunidade"
                className="form-input"
                required
                pattern="[a-z0-9-]+"
                title="Apenas letras minúsculas, números e hifens"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="description" className="form-field__label">Descrição / Manifesto</label>
            <textarea
              id="description"
              name="description"
              placeholder="O que move este coletivo? Quais os objetivos?"
              className="form-input"
              rows={4}
            />
          </div>

          <div className="form-footer">
            <button type="submit" className="form-btn">
              Criar Comunidade
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-page { display: flex; justify-content: center; padding-top: var(--space-8); }
        .form-page__card {
          width: 100%; max-width: 600px;
          background-color: var(--surface-raised); border: 1px solid var(--surface-border);
          border-radius: var(--radius-lg); padding: var(--space-8);
          display: flex; flex-direction: column; gap: var(--space-8);
        }
        .form-page__header { display: flex; flex-direction: column; gap: var(--space-2); }
        .form-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; letter-spacing: 0.05em; }
        .form-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .form-desc { color: var(--text-secondary); font-size: var(--text-sm); }

        .form-alert {
          padding: var(--space-4); border-radius: var(--radius-sm);
          font-size: var(--text-sm); font-family: var(--font-mono);
          background-color: #2a0a0a; border: 1px solid var(--color-danger); color: #f08080;
          display: flex; gap: var(--space-2);
        }

        .form-stack { display: flex; flex-direction: column; gap: var(--space-6); }
        .form-field { display: flex; flex-direction: column; gap: var(--space-2); }
        .form-field__label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); }

        .form-input {
          width: 100%; padding: var(--space-3) var(--space-4);
          background-color: var(--surface-overlay); border: 1px solid var(--surface-border);
          border-radius: var(--radius-md); color: var(--text-primary);
          font-size: var(--text-sm); font-family: var(--font-sans); outline: none; transition: border-color 0.2s;
        }
        .form-input:focus { border-color: var(--accent); }

        .slug-input-wrapper { display: flex; align-items: center; background-color: var(--surface-overlay); border: 1px solid var(--surface-border); border-radius: var(--radius-md); }
        .slug-prefix { padding-left: var(--space-4); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); white-space: nowrap; }
        .slug-input-wrapper .form-input { border: none; padding-left: var(--space-1); }

        .form-footer { padding-top: var(--space-4); border-top: 1px solid var(--surface-border); }
        .form-btn {
          width: 100%; background-color: var(--accent); color: var(--text-inverse);
          border: none; border-radius: var(--radius-sm); padding: var(--space-3);
          font-size: var(--text-sm); font-weight: 700; font-family: var(--font-mono); text-transform: uppercase;
          cursor: pointer; transition: background-color 0.2s;
        }
        .form-btn:hover { background-color: var(--accent-dim); }
      `}</style>
    </main>
  )
}
