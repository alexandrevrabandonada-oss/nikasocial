import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AcervoListPage() {
  const supabase = await createClient()
  const { data: pages } = await supabase
    .from('knowledge_pages')
    .select('id, slug, title, summary, community_id, updated_at, communities(name)')
    .eq('is_published', true)
    .order('updated_at', { ascending: false })

  return (
    <div className="acervo-list-page">
      <h1>Acervo</h1>
      <Link href="/acervo/nova" className="acervo-new-btn">Nova Página</Link>
      <ul className="acervo-list">
        {pages?.map((page) => (
          <li key={page.id}>
            <Link href={`/acervo/${page.slug}`}>{page.title}</Link>
            <div className="acervo-summary">{page.summary}</div>
            {page.communities?.name && (
              <div className="acervo-community">Comunidade: {page.communities.name}</div>
            )}
            <div className="acervo-meta">Atualizado em {new Date(page.updated_at).toLocaleDateString('pt-BR')}</div>
          </li>
        ))}
        {!pages?.length && <li>Nenhuma página criada ainda.</li>}
      </ul>
    </div>
  )
}
