import { listProjectLinks } from '@/lib/projects/actions'
import Link from 'next/link'

export const metadata = { title: 'Projetos' }

export default async function ProjetosPage() {
  const projetos = (await listProjectLinks()).filter(p => p.is_active !== false)
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Projetos do Ecossistema</h1>
      <p className="mb-6 text-gray-600">Navegue por apps, ferramentas, mapas e ações conectadas ao Nika.</p>
      <ul className="grid gap-4">
        {projetos.map((p) => (
          <li key={p.id} className="border rounded p-4 bg-white">
            <Link href={`/projetos/${p.slug}`} className="text-lg font-semibold hover:underline">{p.title}</Link>
            <div className="text-xs text-gray-500 mb-1">{p.project_type}</div>
            <div className="text-sm mb-2">{p.description}</div>
            {p.community && (
              <div className="text-xs text-blue-700">Comunidade: <Link href={`/comunidades/${p.community.slug}`}>{p.community.name}</Link></div>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
