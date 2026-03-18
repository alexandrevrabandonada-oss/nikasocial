import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Entrar' }

/**
 * Rota /entrar – Login e autenticação
 *
 * [PLACEHOLDER] Autenticação real via Supabase será implementada no Tijolo 02.
 * Por ora: formulário visual sem funcionalidade server.
 *
 * Estratégias planejadas:
 * - Magic link por email (sem senha)
 * - OAuth: GitHub, talvez outros
 * - Sem Google OAuth por padrão (posicionamento ideológico)
 */
export default function EntrarPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-logo">nika</span>
          <h1 className="auth-title">Entrar</h1>
          <p className="auth-desc">Use seu email para receber um link de acesso.</p>
        </div>

        <form className="auth-form">
          <label className="auth-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="auth-input"
            placeholder="seu@email.com"
            autoComplete="email"
            required
          />

          <button type="submit" className="auth-btn">
            Enviar link de acesso
          </button>
        </form>

        <p className="auth-footer">
          Não tem conta?{' '}
          <a href="/cadastrar">Cadastrar</a>
        </p>

        <div className="auth-note">
          <span className="badge">PLACEHOLDER</span>
          <span>Supabase auth não configurado neste ambiente.</span>
        </div>
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

        .auth-card__header {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .auth-logo {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
        }

        .auth-title {
          font-size: var(--text-2xl);
          color: var(--text-primary);
        }

        .auth-desc {
          font-size: var(--text-sm);
          color: var(--text-secondary);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .auth-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
        }

        .auth-input {
          width: 100%;
          padding: var(--space-3) var(--space-4);
          background-color: var(--surface-overlay);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--text-base);
          font-family: var(--font-sans);
          transition: border-color var(--transition-fast);
          outline: none;
        }

        .auth-input:focus {
          border-color: var(--accent);
        }

        .auth-input::placeholder {
          color: var(--text-muted);
        }

        .auth-btn {
          width: 100%;
          padding: var(--space-3) var(--space-4);
          background-color: var(--accent);
          color: var(--text-inverse);
          border: none;
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: background-color var(--transition-fast);
          margin-top: var(--space-2);
        }

        .auth-btn:hover {
          background-color: var(--accent-dim);
        }

        .auth-footer {
          font-size: var(--text-sm);
          color: var(--text-muted);
          text-align: center;
        }

        .auth-footer a {
          color: var(--text-secondary);
        }

        .auth-footer a:hover {
          color: var(--text-primary);
        }

        .auth-note {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono);
          padding-top: var(--space-4);
          border-top: 1px solid var(--surface-border);
        }
      `}</style>
    </main>
  )
}
