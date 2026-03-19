import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Meu Perfil' }

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/entrar')

  // Busca profile completo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile }: { data: any } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const displayName = profile?.display_name ?? profile?.username ?? user.email?.split('@')[0]
  const username = profile?.username ?? '—'
  const memberSince = new Date(user.created_at).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <span className="profile-label">◍ perfil</span>
        <h1 className="profile-title">Meu Perfil</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar" aria-hidden="true">
          {displayName?.[0]?.toUpperCase() ?? '?'}
        </div>

        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-field-label">Nome</span>
            <span className="profile-field-value">{displayName}</span>
          </div>
          <div className="profile-row">
            <span className="profile-field-label">Username</span>
            <span className="profile-field-value profile-field-value--mono">@{username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-field-label">Email</span>
            <span className="profile-field-value profile-field-value--mono">{user.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-field-label">Membro desde</span>
            <span className="profile-field-value">{memberSince}</span>
          </div>
          {profile?.bio && (
            <div className="profile-row profile-row--full">
              <span className="profile-field-label">Bio</span>
              <p className="profile-bio">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="profile-actions-note">
        <span className="badge">TIJOLO 05</span>
        <span>Edição de perfil, histórico de ações e comunidades chegam no Tijolo 05.</span>
      </div>

      <style>{`
        .profile-page { display: flex; flex-direction: column; gap: var(--space-8); }
        .profile-page__header { display: flex; flex-direction: column; gap: var(--space-3); padding-bottom: var(--space-6); border-bottom: 1px solid var(--surface-border); }
        .profile-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; letter-spacing: 0.05em; }
        .profile-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .profile-card { display: flex; gap: var(--space-6); align-items: flex-start; padding: var(--space-6); background-color: var(--surface-raised); border: 1px solid var(--surface-border); border-radius: var(--radius-lg); }
        @media (max-width: 640px) { .profile-card { flex-direction: column; align-items: center; } }
        .profile-avatar { width: 64px; height: 64px; flex-shrink: 0; background-color: var(--accent-muted); border: 2px solid var(--accent-dim); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-mono); color: var(--accent); }
        .profile-info { display: flex; flex-direction: column; gap: var(--space-4); flex: 1; }
        .profile-row { display: flex; flex-direction: column; gap: var(--space-1); }
        .profile-field-label { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .profile-field-value { font-size: var(--text-base); color: var(--text-primary); }
        .profile-field-value--mono { font-family: var(--font-mono); font-size: var(--text-sm); }
        .profile-bio { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; }
        .profile-actions-note { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); padding: var(--space-4); border: 1px dashed var(--surface-border); border-radius: var(--radius-sm); }
      `}</style>
    </div>
  )
}
