/**
 * Home Page – Landing (logged-out view)
 *
 * Esta página é pública. Usuários autenticados são redirecionados pelo
 * middleware para /explorar automaticamente.
 *
 * Design: minimal, direto, sem hero inflado.
 * Faz o trabalho de apresentar o projeto com honestidade.
 */

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nika – Plataforma Social Comunitária',
}

export default function HomePage() {
  return (
    <main className="landing">
      <div className="landing__inner container">
        {/* Logotipo */}
        <header className="landing__header">
          <span className="landing__logo">nika</span>
          <span className="badge badge--accent">alpha</span>
        </header>

        {/* Tagline */}
        <section className="landing__hero">
          <h1 className="landing__title">Uma rede feita por coletivos,<br />para coletivos.</h1>
          <p className="landing__desc">
            O Nika é uma plataforma social de código aberto — comunidades, acervo colaborativo
            e projetos conectados. Sem algoritmos de engajamento. Sem likes como moeda.
          </p>
        </section>

        {/* CTAs */}
        <section className="landing__actions">
          <Link href="/entrar" className="btn btn--primary">
            Entrar
          </Link>
          <Link href="/explorar" className="btn btn--ghost">
            Explorar sem conta
          </Link>
        </section>

        {/* Navegação rápida para áreas do produto */}
        <nav className="landing__nav">
          <Link href="/comunidades" className="landing__nav-item">
            <span className="landing__nav-icon">◈</span>
            <span>Comunidades</span>
          </Link>
          <Link href="/acervo" className="landing__nav-item">
            <span className="landing__nav-icon">◉</span>
            <span>Acervo</span>
          </Link>
          <Link href="/explorar" className="landing__nav-item">
            <span className="landing__nav-icon">◎</span>
            <span>Explorar</span>
          </Link>
        </nav>

        {/* Rodapé mínimo */}
        <footer className="landing__footer">
          <p>
            Software livre. Sem fins lucrativos.{' '}
            <a href="https://github.com/nika-social/nika" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {' · '}
            <Link href="/sobre">Sobre o Nika</Link>
          </p>
        </footer>
      </div>

      <style>{`
        .landing {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          background-color: var(--surface-base);
        }

        .landing__inner {
          padding-block: var(--space-16);
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          max-width: 640px;
        }

        .landing__header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .landing__logo {
          font-family: var(--font-mono);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: lowercase;
        }

        .landing__hero {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .landing__title {
          font-size: var(--text-3xl);
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .landing__title { font-size: var(--text-2xl); }
        }

        .landing__desc {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 540px;
        }

        .landing__actions {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          font-weight: 600;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
          border: 1px solid transparent;
          text-decoration: none;
        }

        .btn--primary {
          background-color: var(--accent);
          color: var(--text-inverse);
          border-color: var(--accent);
        }

        .btn--primary:hover {
          background-color: var(--accent-dim);
          border-color: var(--accent-dim);
          color: var(--text-inverse);
        }

        .btn--ghost {
          background-color: transparent;
          color: var(--text-secondary);
          border-color: var(--surface-border);
        }

        .btn--ghost:hover {
          color: var(--text-primary);
          border-color: var(--concrete-400);
        }

        .landing__nav {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .landing__nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          color: var(--text-muted);
          border: 1px solid var(--surface-border);
          background-color: var(--surface-raised);
          transition: color var(--transition-fast), border-color var(--transition-fast);
          text-decoration: none;
        }

        .landing__nav-item:hover {
          color: var(--text-primary);
          border-color: var(--concrete-600);
        }

        .landing__nav-icon {
          font-size: var(--text-base);
          color: var(--accent);
        }

        .landing__footer {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .landing__footer a {
          color: var(--text-secondary);
        }

        .landing__footer a:hover {
          color: var(--text-primary);
        }
      `}</style>
    </main>
  )
}
