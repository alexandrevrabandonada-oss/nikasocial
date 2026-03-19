import type { Metadata } from 'next'
import { signupAction } from '@/lib/auth/actions'

export const metadata: Metadata = { title: 'Criar conta' }

interface PageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function CadastrarPage({ searchParams }: PageProps) {
  const params = await searchParams
  const error = params.error

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-logo">nika</span>
          <h1 className="auth-title">Criar conta</h1>
          <p className="auth-desc">Escolha um username e defina sua senha.</p>
        </div>

        {error && (
          <div className="auth-alert auth-alert--error" role="alert">
            <span>⚠</span> {decodeURIComponent(error)}
          </div>
        )}

        <form className="auth-form" action={signupAction}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="auth-input"
              placeholder="seunome"
              autoComplete="username"
              pattern="[a-zA-Z0-9_-]+"
              title="Apenas letras, números, _ e -"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="auth-input"
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Senha <span className="auth-hint">(mín. 8 caracteres)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input"
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Criar conta
          </button>
        </form>

        <p className="auth-footer">
          Já tem conta?{' '}
          <a href="/entrar">Entrar</a>
        </p>
      </div>

      <style>{`
        .auth-page { min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: var(--space-4); background-color: var(--surface-base); }
        .auth-card { width: 100%; max-width: 400px; background-color: var(--surface-raised); border: 1px solid var(--surface-border); border-radius: var(--radius-lg); padding: var(--space-8); display: flex; flex-direction: column; gap: var(--space-6); }
        .auth-card__header { display: flex; flex-direction: column; gap: var(--space-2); }
        .auth-logo { font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700; color: var(--accent); letter-spacing: 0.1em; }
        .auth-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .auth-desc { font-size: var(--text-sm); color: var(--text-secondary); }
        .auth-alert { display: flex; align-items: flex-start; gap: var(--space-2); padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); font-size: var(--text-sm); font-family: var(--font-mono); }
        .auth-alert--error { background-color: #2a0a0a; border: 1px solid var(--color-danger); color: #f08080; }
        .auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
        .auth-label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); }
        .auth-hint { font-weight: 400; color: var(--text-muted); font-size: var(--text-xs); }
        .auth-input { width: 100%; padding: var(--space-3) var(--space-4); background-color: var(--surface-overlay); border: 1px solid var(--surface-border); border-radius: var(--radius-md); color: var(--text-primary); font-size: var(--text-base); font-family: var(--font-sans); transition: border-color var(--transition-fast); outline: none; }
        .auth-input:focus { border-color: var(--accent); }
        .auth-input::placeholder { color: var(--text-muted); }
        .auth-btn { width: 100%; padding: var(--space-3) var(--space-4); background-color: var(--accent); color: var(--text-inverse); border: none; border-radius: var(--radius-md); font-size: var(--text-sm); font-weight: 600; font-family: var(--font-sans); cursor: pointer; transition: background-color var(--transition-fast); margin-top: var(--space-2); }
        .auth-btn:hover { background-color: var(--accent-dim); }
        .auth-footer { font-size: var(--text-sm); color: var(--text-muted); text-align: center; }
        .auth-footer a { color: var(--text-secondary); }
        .auth-footer a:hover { color: var(--text-primary); }
      `}</style>
    </main>
  )
}
