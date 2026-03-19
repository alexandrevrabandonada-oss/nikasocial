import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Explorar' }

export default async function ExplorarPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id, title, body, post_type, created_at,
      communities ( id, name, slug ),
      profiles:author_id ( username, display_name )
    `)
    .eq('is_removed', false)
    .order('created_at', { ascending: false })
    .limit(20)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = data as any[] | null
  const hasPosts = !error && posts && posts.length > 0

  return (
    <div className="explore-page">
      <div className="explore-page__header">
        <span className="explore-label">◎ explorar</span>
        <h1 className="explore-title">Descoberta</h1>
        <p className="explore-desc">Posts recentes de comunidades públicas.</p>
        <div className="explore-ecosystem mt-6">
          <span className="text-xs text-gray-500">Nika é portal: veja os <Link href="/projetos" className="text-blue-700 hover:underline">projetos conectados</Link> do ecossistema.</span>
        </div>
      </div>

      {hasPosts ? (
        <div className="post-list">
          {posts.map((post) => {
            const community = Array.isArray(post.communities)
              ? post.communities[0]
              : post.communities
            const author = Array.isArray(post.profiles)
              ? post.profiles[0]
              : post.profiles
            const authorName = author?.display_name ?? author?.username ?? 'anônimo'
            const communityName = community?.name ?? 'comunidade'
            const communitySlug = community?.slug
            const date = new Date(post.created_at).toLocaleDateString('pt-BR')

            return (
              <article key={post.id} className="post-card">
                <div className="post-card__meta">
                  {communitySlug ? (
                    <Link href={`/comunidades/${communitySlug}`} className="post-card__community">
                      ◈ {communityName}
                    </Link>
                  ) : (
                    <span className="post-card__community">◈ {communityName}</span>
                  )}
                  <span className="post-card__sep">·</span>
                  <span className="post-card__author">@{authorName}</span>
                  <span className="post-card__sep">·</span>
                  <time className="post-card__date">{date}</time>
                </div>

                {post.title && <h2 className="post-card__title">{post.title}</h2>}
                {post.body && (
                  <p className="post-card__body">
                    {post.body.length > 240 ? post.body.slice(0, 240) + '…' : post.body}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="explore-empty">
          <p className="explore-empty__text">
            Nenhum post ainda. Crie uma comunidade e publique o primeiro.
          </p>
          <Link href="/comunidades" className="explore-empty__cta">
            Ver comunidades →
          </Link>
        </div>
      )}

      <style>{`
        .explore-page { display: flex; flex-direction: column; gap: var(--space-8); }
        .explore-page__header { display: flex; flex-direction: column; gap: var(--space-3); padding-bottom: var(--space-6); border-bottom: 1px solid var(--surface-border); }
        .explore-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; letter-spacing: 0.05em; }
        .explore-title { font-size: var(--text-2xl); color: var(--text-primary); }
        .explore-desc { color: var(--text-secondary); font-size: var(--text-base); }
        .post-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .post-card { padding: var(--space-5) var(--space-6); background-color: var(--surface-raised); border: 1px solid var(--surface-border); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: var(--space-3); transition: border-color var(--transition-fast); }
        .post-card:hover { border-color: var(--concrete-600); }
        .post-card__meta { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }
        .post-card__community { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--accent); text-decoration: none; }
        .post-card__community:hover { color: var(--accent-dim); }
        .post-card__author { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-secondary); }
        .post-card__date { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-muted); }
        .post-card__sep { color: var(--text-muted); font-size: var(--text-xs); }
        .post-card__title { font-size: var(--text-lg); font-weight: 600; color: var(--text-primary); line-height: 1.3; }
        .post-card__body { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; }
        .explore-empty { padding: var(--space-12) var(--space-6); text-align: center; border: 1px dashed var(--surface-border); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: var(--space-4); align-items: center; }
        .explore-empty__text { color: var(--text-muted); font-size: var(--text-sm); }
        .explore-empty__cta { font-size: var(--text-sm); font-family: var(--font-mono); color: var(--accent); text-decoration: none; }
        .explore-empty__cta:hover { color: var(--accent-dim); }
      `}</style>
    </div>
  )
}
