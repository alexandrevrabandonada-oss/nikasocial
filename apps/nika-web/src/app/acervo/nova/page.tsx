import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AcervoForm from '@/components/acervo/AcervoForm'

export default async function NovaAcervoPage() {
  const supabase = await createClient()
  const { data: communities } = await supabase
    .from('communities')
    .select('id, name')
    .order('name', { ascending: true })

  async function handleSuccess(slug: string) {
    'use server'
    redirect(`/acervo/${slug}`)
  }

  return (
    <div className="acervo-create-page">
      <h1>Criar Página do Acervo</h1>
      <AcervoForm communities={communities || []} onSuccess={handleSuccess} />
    </div>
  )
}
