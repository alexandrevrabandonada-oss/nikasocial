import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostForm from '@/components/communities/PostForm'
import Comments from '@/components/communities/Comments'
import PostActions from '@/components/communities/PostActions'
import { listProjectLinks } from '@/lib/projects/actions'

interface PageProps {
  params: Promise<{ slug: string }>
}


export default async function CommunityPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Buscar detalhes da comunidade
  const { data, error: commError } = await supabase
    .from('communities')
    .select(`
      id, name, slug, description, created_at,
      profiles:created_by ( username, display_name )
    `)
    .eq('slug', slug)
    .single()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const community = data as any

  if (commError || !community) {
    notFound()
  }

  // Buscar posts da comunidade
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select(`
      id, title, body, created_at,
      profiles:author_id ( username, display_name )
    `)
    .eq('community_id', community.id)
    .eq('is_removed', false)
    .order('created_at', { ascending: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = postsData as any[] | null

  // Sessão para exibir formulário
  const { data: { user } } = await supabase.auth.getUser()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const creator = (community.profiles as any)
  const creatorName = creator?.display_name ?? creator?.username ?? '—'

  // Buscar projetos ligados à comunidade
  const projetos = await listProjectLinks()
  const projetosDaComunidade = projetos.filter(p => p.community_id === community.id)

  return (
    <div className="community-page">
      {/* Header da Comunidade */}
      <header className="community-header">
        <div className="community-header__info">
          <span className="community-header__badge">◈ comunidade</span>
          <h1 className="community-header__name">{community.name}</h1>
          <p className="community-header__desc">{community.description}</p>
          <div className="community-header__meta">
            <span>Iniciada por @{creatorName}</span>
            <span>·</span>
            <span>{new Date(community.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </header>

      {/* Área Interna */}
      <div className="community-layout">
        {/* Coluna Principal: Feed */}
        <div className="community-feed">
          {/* Formulário de Postagem */}
          {user ? (
            <PostForm communityId={community.id} communitySlug={community.slug} />
          ) : (
            <div className="auth-notice">
              <Link href="/entrar" className="auth-notice__link">
                Faça login para participar deste coletivo
              </Link>
            </div>
          )}

          {/* Posts */}
          <div className="posts-container">
            {!postsError && posts && posts.length > 0 ? (
              posts.map((post) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const author = (post.profiles as any)
                const authorName = author?.display_name ?? author?.username ?? 'anônimo'
                const postDate = new Date(post.created_at).toLocaleDateString('pt-BR')

                return (
                  <article key={post.id} className="post-card">
                    <header className="post-card__header">
                      <span className="post-card__author">@{authorName}</span>
                      <span className="post-card__sep">·</span>
                      <time className="post-card__date">{postDate}</time>
                    </header>
                    {post.title && <h3 className="post-card__title">{post.title}</h3>}
                      <div className="post-card__body">
                        {post.body}
                      </div>
                      {/* Ações Comunitárias */}
                      <PostActions postId={post.id} user={user} />
                      {/* Comentários */}
                      <Comments postId={post.id} user={user} />
                  </article>
                )
              })
            ) : (
              <div className="posts-empty">
                Ainda não há publicações aqui. Seja o primeiro a dizer algo.
              </div>
            )}
          </div>
        </div>

        {/* Barra Lateral: futura info, regras, conexões */}
        <aside className="community-aside">
           <div className="aside-card">
             <h3>Unidade Coletiva</h3>
             <p>As comunidades são o núcleo político do Nika. O diálogo aqui é a base da ação.</p>
           </div>
        {projetosDaComunidade.length > 0 && (
          <div className="aside-card mt-6">
            <h3>Projetos ligados a esta comunidade</h3>
            <ul className="grid gap-2">
              {projetosDaComunidade.map((p) => (
                <li key={p.id}>
                  <Link href={`/projetos/${p.slug}`} className="text-blue-700 hover:underline">{p.title}</Link> <span className="text-xs text-gray-500">({p.project_type})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        </aside>
      </div>

      <style>{`
        .community-page { display: flex; flex-direction: column; gap: var(--space-8); }
        .community-header { padding-bottom: var(--space-8); border-bottom: 2px solid var(--surface-border); }
        .community-header__badge { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; }
        .community-header__name { font-size: var(--text-3xl); color: var(--text-primary); font-weight: 700; margin-top: var(--space-2); }
        .community-header__desc { font-size: var(--text-base); color: var(--text-secondary); line-height: 1.6; margin-top: var(--space-4); max-width: 800px; }
        .community-header__meta { display: flex; gap: var(--space-3); margin-top: var(--space-4); font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); }
        .community-layout { display: flex; gap: var(--space-10); }
        @media (max-width: 900px) { .community-layout { flex-direction: column; } }
        .community-feed { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .auth-notice { padding: var(--space-6); background-color: var(--surface-raised); border: 1px dashed var(--surface-border); border-radius: var(--radius-md); text-align: center; margin-bottom: var(--space-8); }
        .auth-notice__link { font-size: var(--text-sm); font-family: var(--font-mono); color: var(--accent); text-decoration: none; }
        .posts-container { display: flex; flex-direction: column; gap: var(--space-4); }
        .post-card { background-color: var(--surface-raised); border: 1px solid var(--surface-border); border-radius: var(--radius-md); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); }
        .post-card__header { display: flex; gap: var(--space-2); align-items: center; }
        .post-card__author { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-secondary); }
        .post-card__sep { color: var(--text-muted); font-size: 10px; }
        .post-card__date { font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono); }
        .post-card__title { font-size: var(--text-base); font-weight: 600; color: var(--text-primary); }
        .post-card__body { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap; }
        .posts-empty { padding: var(--space-12) var(--space-4); text-align: center; color: var(--text-muted); font-size: var(--text-sm); }
        .community-aside { width: 300px; flex-shrink: 0; }
        @media (max-width: 900px) { .community-aside { width: 100%; } }
        .aside-card { background-color: var(--surface-overlay); border-radius: var(--radius-md); padding: var(--space-5); border: 1px solid var(--surface-border); }
        .aside-card h3 { font-size: var(--text-sm); font-weight: 700; font-family: var(--font-mono); margin-bottom: var(--space-3); color: var(--text-primary); }
        .aside-card p { font-size: var(--text-xs); color: var(--text-muted); line-height: 1.5; }
      `}</style>
    </div>
  )
}
