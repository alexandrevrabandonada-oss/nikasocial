import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Comunidades' }

/**
 * Rota /comunidades – Listagem e gestão de comunidades
 *
 * [PLACEHOLDER] Implementação prevista no Tijolo 03.
 * Conteúdo previsto:
 * - Lista de comunidades públicas (grid/lista)
 * - Busca por nome e tema
 * - Criar nova comunidade
 * - Comunidades que o usuário participa
 * - Moderação por consenso (fase posterior)
 */
export default function ComunidadesPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__header">
        <span className="placeholder-label">◈ comunidades</span>
        <h1>Comunidades</h1>
        <p>Espaços de organização, debate e construção coletiva.</p>
      </div>

      <div className="placeholder-page__content">
        <p className="placeholder-wip">
          [PLACEHOLDER] Implementação prevista no Tijolo 03.
        </p>
        <ul className="placeholder-list">
          <li>Listagem de comunidades públicas</li>
          <li>Entrada e saída de comunidades</li>
          <li>Criação de nova comunidade</li>
          <li>Moderação por consenso (fase posterior)</li>
          <li>Comunidades federadas via ActivityPub (fase posterior)</li>
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
