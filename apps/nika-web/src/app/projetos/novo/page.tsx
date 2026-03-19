import { ProjectForm } from '@/components/projects/ProjectForm'
import { requireAuth } from '@/lib/auth/actions'

export const metadata = { title: 'Novo Projeto' }

export default async function NovoProjetoPage() {
  await requireAuth()
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Projeto/Link</h1>
      <ProjectForm />
    </main>
  )
}
