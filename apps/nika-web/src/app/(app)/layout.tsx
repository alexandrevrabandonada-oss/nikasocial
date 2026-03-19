/**
 * Layout Autenticado – Nika Web (Tijolo 02)
 *
 * Conectado à sessão real via Supabase.
 * Exibe dados do usuário autenticado na sidebar.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/auth/LogoutButton'

export const metadata: Metadata = {
  title: { default: 'Nika', template: '%s | Nika' },
}

const navItems = [
  { href: '/explorar', label: 'Explorar', icon: '◎' },
  { href: '/comunidades', label: 'Comunidades', icon: '◈' },
  { href: '/acervo', label: 'Acervo', icon: '◉' },
  { href: '/projetos', label: 'Projetos', icon: '⧉' },
  { href: '/perfil', label: 'Meu Perfil', icon: '◍' },
]

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let profile: any = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username, display_name')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const displayName = profile?.display_name ?? profile?.username ?? user?.email?.split('@')[0] ?? 'usuário'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__inner">
          <Link href="/" className="sidebar__logo">nika</Link>

          <nav className="sidebar__nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="sidebar__nav-item">
                <span className="sidebar__nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="sidebar__user">
            {user ? (
              <>
                <div className="sidebar__user-info">
                  <span className="sidebar__user-avatar">{displayName[0]?.toUpperCase()}</span>
                  <div className="sidebar__user-text">
                    <span className="sidebar__user-name">{displayName}</span>
                    <span className="sidebar__user-email">{user.email}</span>
                  </div>
                </div>
                <LogoutButton className="sidebar__logout-btn" />
              </>
            ) : (
              <Link href="/entrar" className="sidebar__auth-link">Entrar</Link>
            )}
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <Link href="/" className="topbar__logo">nika</Link>
          <nav className="topbar__nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="topbar__nav-item" title={item.label}>
                {item.icon}
              </Link>
            ))}
          </nav>
          {user && (
            <LogoutButton className="topbar__logout-btn" />
          )}
        </header>

        <main className="main-content">{children}</main>
      </div>

      <style>{`
        .app-shell { display: flex; min-height: 100dvh; background-color: var(--surface-base); }
        .sidebar { width: var(--sidebar-width); min-height: 100dvh; border-right: 1px solid var(--surface-border); background-color: var(--surface-raised); position: sticky; top: 0; flex-shrink: 0; }
        @media (max-width: 768px) { .sidebar { display: none; } }
        .sidebar__inner { display: flex; flex-direction: column; height: 100dvh; padding: var(--space-6) var(--space-4); gap: var(--space-6); position: sticky; top: 0; }
        .sidebar__logo { font-family: var(--font-mono); font-size: var(--text-xl); font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-decoration: none; }
        .sidebar__nav { display: flex; flex-direction: column; gap: var(--space-1); flex: 1; }
        .sidebar__nav-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); border-radius: var(--radius-md); font-size: var(--text-sm); color: var(--text-secondary); text-decoration: none; transition: background-color var(--transition-fast), color var(--transition-fast); }
        .sidebar__nav-item:hover { background-color: var(--surface-overlay); color: var(--text-primary); }
        .sidebar__nav-icon { font-size: var(--text-base); color: var(--accent); width: 20px; text-align: center; }
        .sidebar__user { padding-top: var(--space-4); border-top: 1px solid var(--surface-border); display: flex; flex-direction: column; gap: var(--space-3); }
        .sidebar__user-info { display: flex; align-items: center; gap: var(--space-3); }
        .sidebar__user-avatar { width: 32px; height: 32px; border-radius: var(--radius-md); background-color: var(--accent-muted); color: var(--accent); font-size: var(--text-sm); font-weight: 700; font-family: var(--font-mono); display: flex; align-items: center; justify-content: center; border: 1px solid var(--accent-dim); flex-shrink: 0; }
        .sidebar__user-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .sidebar__user-name { font-size: var(--text-sm); font-weight: 600; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sidebar__user-email { font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sidebar__logout-btn { background: none; border: 1px solid var(--surface-border); border-radius: var(--radius-sm); padding: var(--space-2) var(--space-3); font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); cursor: pointer; width: 100%; text-align: left; transition: border-color var(--transition-fast), color var(--transition-fast); }
        .sidebar__logout-btn:hover { border-color: var(--color-danger); color: #f08080; }
        .sidebar__auth-link { font-size: var(--text-xs); color: var(--text-muted); text-decoration: none; font-family: var(--font-mono); }
        .sidebar__auth-link:hover { color: var(--text-secondary); }
        .main-area { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .topbar { display: none; align-items: center; justify-content: space-between; padding: 0 var(--space-4); height: var(--header-height); border-bottom: 1px solid var(--surface-border); background-color: var(--surface-raised); position: sticky; top: 0; z-index: 10; gap: var(--space-3); }
        @media (max-width: 768px) { .topbar { display: flex; } }
        .topbar__logo { font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700; color: var(--accent); text-decoration: none; }
        .topbar__nav { display: flex; gap: var(--space-1); flex: 1; justify-content: center; }
        .topbar__nav-item { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: var(--radius-md); color: var(--text-secondary); font-size: var(--text-lg); text-decoration: none; transition: background-color var(--transition-fast), color var(--transition-fast); }
        .topbar__nav-item:hover { background-color: var(--surface-overlay); color: var(--text-primary); }
        .topbar__logout-btn { background: none; border: none; color: var(--text-muted); font-size: var(--text-xs); font-family: var(--font-mono); cursor: pointer; padding: var(--space-2); white-space: nowrap; }
        .topbar__logout-btn:hover { color: var(--text-primary); }
        .main-content { flex: 1; padding: var(--space-8) var(--space-6); max-width: 960px; width: 100%; }
        @media (max-width: 768px) { .main-content { padding: var(--space-4); } }
      `}</style>
    </div>
  )
}
