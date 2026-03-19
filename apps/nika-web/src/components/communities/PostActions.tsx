"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const ACTIONS = [
  { type: 'apoiar', label: 'Apoiar', desc: 'Demonstra suporte comunitário' },
  { type: 'confirmar', label: 'Confirmar', desc: 'Reconhece/valida o conteúdo' },
  { type: 'replicar', label: 'Replicar', desc: 'Indica que deve circular' },
  { type: 'convocar', label: 'Convocar', desc: 'Chama para mobilização' },
  { type: 'acervo', label: 'Acervo', desc: 'Sugere para a memória coletiva' },
]

interface PostActionsProps {
  postId: string
  user: any
}

export default function PostActions({ postId, user }: PostActionsProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [userActions, setUserActions] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, user?.id])

  async function fetchActions() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    // Buscar contadores agregados
    const { data, error } = await supabase
      .from('reactions_as_actions')
      .select('action_type, actor_id')
      .eq('target_type', 'post')
      .eq('target_id', postId)
    if (error) setError('Erro ao carregar ações')
    // Contagem por tipo
    const counts: Record<string, number> = {}
    const userActions: Record<string, boolean> = {}
    for (const a of ACTIONS) counts[a.type] = 0
    for (const row of data || []) {
      counts[row.action_type] = (counts[row.action_type] || 0) + 1
      if (user && row.actor_id === user.id) userActions[row.action_type] = true
    }
    setCounts(counts)
    setUserActions(userActions)
    setLoading(false)
  }

  async function toggleAction(actionType: string) {
    if (!user) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    if (userActions[actionType]) {
      // Remover ação
      const { error } = await supabase
        .from('reactions_as_actions')
        .delete()
        .eq('target_type', 'post')
        .eq('target_id', postId)
        .eq('action_type', actionType)
        .eq('actor_id', user.id)
      if (error) setError('Erro ao remover ação')
    } else {
      // Adicionar ação
      const { error } = await supabase
        .from('reactions_as_actions')
        .insert({
          target_type: 'post',
          target_id: postId,
          action_type: actionType,
          actor_id: user.id,
        })
      if (error) setError('Erro ao registrar ação')
    }
    await fetchActions()
    setLoading(false)
  }

  return (
    <div className="post-actions-bar">
      {ACTIONS.map((a) => (
        <button
          key={a.type}
          className={`post-action-btn${userActions[a.type] ? ' active' : ''}`}
          disabled={loading || !user}
          title={a.desc}
          onClick={() => toggleAction(a.type)}
        >
          <span className="post-action-label">{a.label}</span>
          <span className="post-action-count">{counts[a.type] || 0}</span>
        </button>
      ))}
      {!user && <span className="post-actions-hint">Entre para participar das ações</span>}
      {error && <span className="post-actions-error">{error}</span>}
      <style>{`
        .post-actions-bar { display: flex; gap: var(--space-2); align-items: center; margin-top: var(--space-2); }
        .post-action-btn { background: var(--surface-overlay); border: 1px solid var(--surface-border); border-radius: var(--radius-sm); padding: 4px 10px; font-size: var(--text-xs); color: var(--text-primary); cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.1s; }
        .post-action-btn.active { background: var(--accent-bg); color: var(--accent); border-color: var(--accent); font-weight: 600; }
        .post-action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .post-action-label { font-family: var(--font-mono); }
        .post-action-count { font-size: 11px; color: var(--text-muted); margin-left: 2px; }
        .post-actions-hint { font-size: var(--text-xs); color: var(--text-muted); margin-left: var(--space-3); }
        .post-actions-error { color: var(--danger); font-size: var(--text-xs); margin-left: var(--space-3); }
      `}</style>
    </div>
  )
}
