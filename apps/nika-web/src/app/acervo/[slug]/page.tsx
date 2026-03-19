
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { listProjectLinks } from '@/lib/projects/actions'
import { FlagButton } from '@/components/moderation/FlagButton'

export default async function AcervoViewPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: page } = await supabase
    .from('knowledge_pages')
    .select('id, slug, title, summary, body_current, community_id, last_edited_by, updated_at')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()
  if (!page) notFound()

  // Buscar revisões
  const { data: revisions } = await supabase
    .from('knowledge_page_revisions')
    .select('id, editor_id, title_snapshot, created_at, edit_note')
    .eq('page_id', page.id)
    .order('created_at', { ascending: false })

  // Buscar projetos relacionados
  const projetos = await listProjectLinks()
  const projetosRelacionados = projetos.filter(p => p.knowledge_page_id === page.id)

  return (
    <div className="acervo-view-page">
      <h1>{page.title}
        <FlagButton content_type="knowledge_page" content_id={page.id} />
      </h1>
      {page.is_locked && (
        <div className="text-xs text-red-700 mb-2">Esta página está travada para edição por decisão de moderação.</div>
      )}
      <div className="acervo-summary">{page.summary}</div>
      <div className="acervo-body">{page.body_current}</div>
      <div className="acervo-meta">Última edição: {new Date(page.updated_at).toLocaleString('pt-BR')}</div>
      <Link href={`/acervo/${page.slug}/editar`} className="acervo-edit-btn">Editar</Link>
      <div className="acervo-history">
        <h3>Histórico</h3>
        <ul>
          {revisions?.map((rev) => (
            <li key={rev.id}>
              {new Date(rev.created_at).toLocaleString('pt-BR')} – {rev.title_snapshot}
              {rev.edit_note && <span> ({rev.edit_note})</span>}
            </li>
          ))}
          {!revisions?.length && <li>Nenhuma revisão registrada.</li>}
        </ul>
      </div>
      {projetosRelacionados.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-2">Projetos relacionados</h2>
          <ul className="grid gap-2">
            {projetosRelacionados.map((p) => (
              <li key={p.id}>
                <Link href={`/projetos/${p.slug}`} className="text-blue-700 hover:underline">{p.title}</Link> <span className="text-xs text-gray-500">({p.project_type})</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
