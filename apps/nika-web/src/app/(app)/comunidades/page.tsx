import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Comunidades' }

export default async function ComunidadesPage() {
  const supabase = await createClient()

  // Buscar todas as comunidades públicas
  const { data, error } = await supabase
    .from('communities')
    .select(`
      id, name, slug, description, created_at,
      profiles:created_by ( username, display_name )
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const communities = data as any[] | null

  // Verificar sessão para botão "Nova Comunidade"
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="communities-page">
      <div className="communities-page__header">
        <div className="communities-page__title-area">
          <span className="communities-label">◈ comunidades</span>
          <h1 className="communities-title">Organização Coletiva</h1>
          <p className="communities-desc">Espaços de troca, estudo e ação autogerida.</p>
        </div>

        {user && (
          <Link href="/comunidades/nova" className="btn-primary">
            + Nova Comunidade
          </Link>
        )}
      </div>

      {!error && communities && communities.length > 0 ? (
        <div className="communities-grid">
          {communities.map((community) => {
             const creator = community.profiles
             const creatorName = creator?.display_name ?? creator?.username ?? '—'

             return (
               <Link
                 key={community.id}
                 href={`/comunidades/${community.slug}`}
                 className="community-card"
               >
                 <div className="community-card__header">
                   <span className="community-card__icon">◈</span>
                   <h2 className="community-card__name">{community.name}</h2>
                 </div>
                 <p className="community-card__desc">{community.description}</p>
                 <div className="community-card__footer">
                   <span className="community-card__meta">criada por @{creatorName}</span>
                 </div>
               </Link>
             )
          })}
        </div>
      ) : (
        <div className="communities-empty">
          <p>Nenhuma comunidade criada ainda. Que tal começar uma?</p>
          {!user && (
            <Link href="/entrar" className="communities-empty__btn">
              Entrar para criar uma comunidade
            </Link>
          )}
        </div>
      )}

      <style>{`
        .communities-page { display: flex; flex-direction: column; gap: var(--space-8); }
        .communities-page__header {
          display: flex; justify-content: space-between; align-items: flex-end;
          padding-bottom: var(--space-6); border-bottom: 1px solid var(--surface-border);
          gap: var(--space-4); flex-wrap: wrap;
        }
        .communities-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; letter-spacing: 0.05em; }
        .communities-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .communities-desc { color: var(--text-secondary); font-size: var(--text-base); }

        .btn-primary {
          background-color: var(--accent); color: var(--text-inverse);
          text-decoration: none; padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-sm); font-size: var(--text-xs);
          font-weight: 700; font-family: var(--font-mono); text-transform: uppercase;
          transition: background-color 0.2s;
        }
        .btn-primary:hover { background-color: var(--accent-dim); }

        .communities-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4);
        }

        .community-card {
          background-color: var(--surface-raised); border: 1px solid var(--surface-border);
          padding: var(--space-5); border-radius: var(--radius-md);
          text-decoration: none; display: flex; flex-direction: column; gap: var(--space-3);
          transition: border-color 0.2s, transform 0.2s;
        }
        .community-card:hover { border-color: var(--concrete-600); transform: translateY(-2px); }

        .community-card__header { display: flex; align-items: center; gap: var(--space-2); }
        .community-card__icon { color: var(--accent); font-size: var(--text-lg); }
        .community-card__name { font-size: var(--text-base); color: var(--text-primary); font-weight: 600; }
        .community-card__desc { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5; flex: 1; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
        .community-card__footer { padding-top: var(--space-2); border-top: 1px solid var(--surface-border); opacity: 0.6; }
        .community-card__meta { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-muted); }

        .communities-empty {
          padding: var(--space-12) var(--space-6); text-align: center; border: 1px dashed var(--surface-border); border-radius: var(--radius-md);
          display: flex; flex-direction: column; gap: var(--space-4); align-items: center; color: var(--text-muted);
        }
        .communities-empty__btn { font-size: var(--text-sm); color: var(--accent); text-decoration: none; font-family: var(--font-mono); }
      `}</style>
    </div>
  )
}
