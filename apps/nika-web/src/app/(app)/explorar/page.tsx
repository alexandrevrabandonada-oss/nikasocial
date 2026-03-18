import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Explorar' }

/**
 * Rota /explorar – Feed público e descoberta
 *
 * [PLACEHOLDER] Esta rota será implementada no Tijolo 02.
 * Conteúdo previsto:
 * - Feed de posts recentes de comunidades públicas
 * - Filtros por tag, comunidade, tipo de ação
 * - Posts em destaque por amplify (não por likes)
 */
export default function ExplorarPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__header">
        <span className="placeholder-label">◎ explorar</span>
        <h1>Descoberta</h1>
        <p>Feed público de comunidades e conteúdos.</p>
      </div>

      <div className="placeholder-page__content">
        <p className="placeholder-wip">
          [PLACEHOLDER] Implementação prevista no Tijolo 02.
        </p>
        <ul className="placeholder-list">
          <li>Feed de posts públicos</li>
          <li>Filtros por comunidade e tipo</li>
          <li>Busca global</li>
          <li>Trending por ações comunitárias (não por likes)</li>
        </ul>
      </div>

      <PlaceholderStyles />
    </div>
  )
}

function PlaceholderStyles() {
  return (
    <style>{`
      .placeholder-page {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
      }
      .placeholder-page__header {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding-bottom: var(--space-6);
        border-bottom: 1px solid var(--surface-border);
      }
      .placeholder-label {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--accent);
        text-transform: lowercase;
        letter-spacing: 0.05em;
      }
      .placeholder-page__header h1 {
        font-size: var(--text-2xl);
        color: var(--text-primary);
      }
      .placeholder-page__header p {
        color: var(--text-secondary);
        font-size: var(--text-base);
      }
      .placeholder-page__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      .placeholder-wip {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        color: var(--color-warning);
        padding: var(--space-3) var(--space-4);
        border: 1px solid var(--color-warning);
        border-radius: var(--radius-sm);
        background-color: #3d2a0a;
      }
      .placeholder-list {
        padding-left: var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        color: var(--text-secondary);
        font-size: var(--text-sm);
      }
    `}</style>
  )
}
