import { listOpenFlags } from '@/lib/moderation/actions'
import Link from 'next/link'

export const metadata = { title: 'Moderação' }

export default async function ModeracaoPage() {
  const flags = await listOpenFlags()
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Fila de Moderação</h1>
      <ul className="grid gap-4">
        {flags.map((flag) => (
          <li key={flag.id} className="border rounded p-4 bg-white">
            <div className="text-xs text-gray-500 mb-1">{flag.content_type} – {flag.reason}</div>
            <div className="mb-2">ID: {flag.content_id}</div>
            {flag.note && <div className="text-xs text-gray-700 mb-2">Nota: {flag.note}</div>}
            <Link href={`/${flag.content_type === 'knowledge_page' ? 'acervo' : 'projetos'}/${flag.content_id}`} className="text-blue-700 hover:underline">Ver conteúdo</Link>
          </li>
        ))}
        {flags.length === 0 && <li>Nenhuma flag aberta.</li>}
      </ul>
    </main>
  )
}
