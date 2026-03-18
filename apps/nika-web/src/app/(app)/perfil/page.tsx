import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Meu Perfil' }

/**
 * Rota /perfil – Perfil do usuário autenticado
 *
 * [PLACEHOLDER] Implementação prevista no Tijolo 05.
 * Conteúdo previsto:
 * - Dados do perfil (username, bio, avatar)
 * - Comunidades que participa
 * - Histórico de ações (amplify, translate, etc)
 * - Contributions ao Acervo
 * - Configurações de conta
 *
 * Sem contagem de seguidores como métrica central.
 * Visibilidade baseada em participação, não em popularidade.
 */
export default function PerfilPage() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__header">
        <span className="placeholder-label">◍ perfil</span>
        <h1>Meu Perfil</h1>
        <p>Sua identidade no Nika. Participação, não popularidade.</p>
      </div>

      <div className="placeholder-page__content">
        <p className="placeholder-wip">
          [PLACEHOLDER] Implementação prevista no Tijolo 05.
        </p>
        <ul className="placeholder-list">
          <li>Editar nome, bio e avatar</li>
          <li>Histórico de ações comunitárias</li>
          <li>Comunidades que participa</li>
          <li>Contribuições ao Acervo</li>
          <li>Configurações de conta e privacidade</li>
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
