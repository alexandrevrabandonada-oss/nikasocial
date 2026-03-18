import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Acervo' }

/**
 * Rota /acervo – Knowledge base colaborativa
 *
 * [PLACEHOLDER] Implementação prevista no Tijolo 04.
 * Conteúdo previsto:
 * - Listagem de knowledge_pages por tema
 * - Busca e filtros
 * - Editor de página wiki (Markdown)
 * - Histórico de edições
 * - Ligação com comunidades e project_links
 *
 * O Acervo é inspirado na Wikipedia, mas sem neutralidade imposta.
 * Ponto de vista é explícito e contextualizado.
 */
export default function AcervoPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__header">
        <span className="placeholder-label">◉ acervo</span>
        <h1>Acervo</h1>
        <p>Base de conhecimento colaborativa. Ponto de vista explícito, sem fingir neutralidade.</p>
      </div>

      <div className="placeholder-page__content">
        <p className="placeholder-wip">
          [PLACEHOLDER] Implementação prevista no Tijolo 04.
        </p>
        <ul className="placeholder-list">
          <li>Listagem de páginas de conhecimento</li>
          <li>Editor Markdown colaborativo</li>
          <li>Histórico de revisões</li>
          <li>Vinculação com comunidades e projetos</li>
          <li>Curadoria por ações comunitárias (não por votos)</li>
        </ul>
      </div>

      <style>{`
        .placeholder-page { display: flex; flex-direction: column; gap: var(--space-8); }
        .placeholder-page__header { display: flex; flex-direction: column; gap: var(--space-3); padding-bottom: var(--space-6); border-bottom: 1px solid var(--surface-border); }
        .placeholder-label { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); text-transform: lowercase; letter-spacing: 0.05em; }
        .placeholder-page__header h1 { font-size: var(--text-2xl); color: var(--text-primary); }
        .placeholder-page__header p { color: var(--text-secondary); font-size: var(--text-base); }
        .placeholder-page__content { display: flex; flex-direction: column; gap: var(--space-4); }
        .placeholder-wip { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-warning); padding: var(--space-3) var(--space-4); border: 1px solid var(--color-warning); border-radius: var(--radius-sm); background-color: #3d2a0a; }
        .placeholder-list { padding-left: var(--space-6); display: flex; flex-direction: column; gap: var(--space-2); color: var(--text-secondary); font-size: var(--text-sm); }
      `}</style>
    </div>
  )
}
