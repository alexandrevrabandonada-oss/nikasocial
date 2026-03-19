import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AcervoForm from '@/components/acervo/AcervoForm'

export default async function EditarAcervoPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: page } = await supabase
    .from('knowledge_pages')
    .select('*')
    .eq('slug', params.slug)
    .single()
  if (!page) notFound()

  const { data: communities } = await supabase
    .from('communities')
    .select('id, name')
    .order('name', { ascending: true })

  async function handleSuccess(slug: string) {
    'use server'
    redirect(`/acervo/${slug}`)
  }

  return (
    <div className="acervo-edit-page">
      <h1>Editar Página do Acervo</h1>
      <AcervoForm page={page} communities={communities || []} onSuccess={handleSuccess} />
    </div>
  )
}
