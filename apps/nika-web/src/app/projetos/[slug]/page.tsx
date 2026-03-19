import { getProjectLinkBySlug } from '@/lib/projects/actions'
import Link from 'next/link'
import type { Metadata } from 'next'
import { FlagButton } from '@/components/moderation/FlagButton'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const projeto = await getProjectLinkBySlug(params.slug)
  if (!projeto) return {}
  return {
    title: projeto.title,
    description: projeto.description,
    openGraph: {
      title: projeto.title,
      description: projeto.description,
      url: `/projetos/${projeto.slug}`,
    },
  }
}

export default async function ProjetoDetalhePage({ params }: { params: { slug: string } }) {
  const projeto = await getProjectLinkBySlug(params.slug)
  if (!projeto) return <div className="container py-8">Projeto não encontrado.</div>
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-2">{projeto.title}
        <FlagButton content_type="project_link" content_id={projeto.id} />
      </h1>
      <div className="text-xs text-gray-500 mb-1">{projeto.project_type}</div>
      <div className="mb-4 text-sm">{projeto.description}</div>
      <a href={projeto.url} target="_blank" rel="noopener" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4">Acessar Projeto</a>
      {projeto.community && (
        <div className="text-xs text-blue-700 mb-1">Comunidade: <Link href={`/comunidades/${projeto.community.slug}`}>{projeto.community.name}</Link></div>
      )}
      {projeto.knowledge_page && (
        <div className="text-xs text-green-700">Acervo: <Link href={`/acervo/${projeto.knowledge_page.slug}`}>{projeto.knowledge_page.title}</Link></div>
      )}
    </main>
  )
}
