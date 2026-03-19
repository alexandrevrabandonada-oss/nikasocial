import type { Metadata } from 'next'
import { loginAction } from '@/lib/auth/actions'

export const metadata: Metadata = { title: 'Entrar' }

interface PageProps {
  searchParams: Promise<{ error?: string; info?: string; next?: string }>
}

export default async function EntrarPage({ searchParams }: PageProps) {
  const params = await searchParams
  const error = params.error
  const info = params.info

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-logo">nika</span>
          <h1 className="auth-title">Entrar</h1>
          <p className="auth-desc">Email e senha para acessar sua conta.</p>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="auth-alert auth-alert--error" role="alert">
            <span>⚠</span> {decodeURIComponent(error)}
          </div>
        )}

        {/* Mensagem de info (ex: confirme seu email) */}
        {info && (
          <div className="auth-alert auth-alert--info" role="alert">
            <span>ℹ</span> {decodeURIComponent(info)}
          </div>
        )}

        <form className="auth-form" action={loginAction}>
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
            <label className="auth-label" htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Entrar
          </button>
        </form>

        <p className="auth-footer">
          Não tem conta?{' '}
          <a href="/cadastrar">Criar conta</a>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4);
          background-color: var(--surface-base);
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          background-color: var(--surface-raised);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }
        .auth-card__header { display: flex; flex-direction: column; gap: var(--space-2); }
        .auth-logo { font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700; color: var(--accent); letter-spacing: 0.1em; }
        .auth-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .auth-desc { font-size: var(--text-sm); color: var(--text-secondary); }
        .auth-alert {
          display: flex; align-items: flex-start; gap: var(--space-2);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          font-family: var(--font-mono);
        }
        .auth-alert--error { background-color: #2a0a0a; border: 1px solid var(--color-danger); color: #f08080; }
        .auth-alert--info { background-color: #0a1a2a; border: 1px solid var(--color-info); color: #80b0f0; }
        .auth-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .auth-field { display: flex; flex-direction: column; gap: var(--space-2); }
        .auth-label { font-size: var(--text-sm); font-weight: 500; color: var(--text-secondary); }
        .auth-input {
          width: 100%; padding: var(--space-3) var(--space-4);
          background-color: var(--surface-overlay); border: 1px solid var(--surface-border);
          border-radius: var(--radius-md); color: var(--text-primary);
          font-size: var(--text-base); font-family: var(--font-sans);
          transition: border-color var(--transition-fast); outline: none;
        }
        .auth-input:focus { border-color: var(--accent); }
        .auth-input::placeholder { color: var(--text-muted); }
        .auth-btn {
          width: 100%; padding: var(--space-3) var(--space-4);
          background-color: var(--accent); color: var(--text-inverse);
          border: none; border-radius: var(--radius-md);
          font-size: var(--text-sm); font-weight: 600; font-family: var(--font-sans);
          cursor: pointer; transition: background-color var(--transition-fast);
          margin-top: var(--space-2);
        }
        .auth-btn:hover { background-color: var(--accent-dim); }
        .auth-footer { font-size: var(--text-sm); color: var(--text-muted); text-align: center; }
        .auth-footer a { color: var(--text-secondary); }
        .auth-footer a:hover { color: var(--text-primary); }
      `}</style>
    </main>
  )
}
