/**
 * Layout Autenticado – Nika Web
 *
 * Envolve todas as rotas que requerem sessão.
 * Contém: sidebar, header, área de conteúdo principal.
 *
 * [MOCK] A verificação server-side de sessão está comentada para facilitar
 * desenvolvimento sem Supabase configurado. Descomente quando as env vars estiverem prontas.
 */

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Nika',
    template: '%s | Nika',
  },
}

const navItems = [
  { href: '/explorar', label: 'Explorar', icon: '◎' },
  { href: '/comunidades', label: 'Comunidades', icon: '◈' },
  { href: '/acervo', label: 'Acervo', icon: '◉' },
  { href: '/perfil', label: 'Meu Perfil', icon: '◍' },
]

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // [MOCK] Verificação de sessão – descomente quando Supabase estiver configurado
  // const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) redirect('/entrar')

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__inner">
          <Link href="/" className="sidebar__logo">
            nika
          </Link>

          <nav className="sidebar__nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="sidebar__nav-item">
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="sidebar__footer">
            <Link href="/entrar" className="sidebar__auth-link">
              Entrar / Cadastrar
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main-area">
        {/* Header mobile */}
        <header className="topbar">
          <span className="topbar__logo">nika</span>
          <nav className="topbar__nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="topbar__nav-item" title={item.label}>
                {item.icon}
              </Link>
            ))}
          </nav>
        </header>

        <main className="main-content">
          {children}
        </main>
      </div>

      <style>{`
        .app-shell {
          display: flex;
          min-height: 100dvh;
          background-color: var(--surface-base);
        }

        /* ─── Sidebar ──────────────────────────────────────── */
        .sidebar {
          width: var(--sidebar-width);
          min-height: 100dvh;
          border-right: 1px solid var(--surface-border);
          background-color: var(--surface-raised);
          position: sticky;
          top: 0;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .sidebar { display: none; }
        }

        .sidebar__inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: var(--space-6) var(--space-4);
          gap: var(--space-8);
        }

        .sidebar__logo {
          font-family: var(--font-mono);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-decoration: none;
        }

        .sidebar__nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          flex: 1;
        }

        .sidebar__nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-3);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          text-decoration: none;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .sidebar__nav-item:hover {
          background-color: var(--surface-overlay);
          color: var(--text-primary);
        }

        .sidebar__nav-icon {
          font-size: var(--text-base);
          color: var(--accent);
          width: 20px;
          text-align: center;
        }

        .sidebar__footer {
          padding-top: var(--space-4);
          border-top: 1px solid var(--surface-border);
        }

        .sidebar__auth-link {
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-decoration: none;
          font-family: var(--font-mono);
        }

        .sidebar__auth-link:hover {
          color: var(--text-secondary);
        }

        /* ─── Main ─────────────────────────────────────────── */
        .main-area {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        /* ─── Topbar (mobile) ──────────────────────────────── */
        .topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-4);
          height: var(--header-height);
          border-bottom: 1px solid var(--surface-border);
          background-color: var(--surface-raised);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .topbar { display: flex; }
        }

        .topbar__logo {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--accent);
        }

        .topbar__nav {
          display: flex;
          gap: var(--space-1);
        }

        .topbar__nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: var(--text-lg);
          text-decoration: none;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }

        .topbar__nav-item:hover {
          background-color: var(--surface-overlay);
          color: var(--text-primary);
        }

        /* ─── Conteúdo ─────────────────────────────────────── */
        .main-content {
          flex: 1;
          padding: var(--space-8) var(--space-6);
          max-width: 960px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: var(--space-4);
          }
        }
      `}</style>
    </div>
  )
}
