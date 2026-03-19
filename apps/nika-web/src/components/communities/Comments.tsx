
"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Comment {
  id: string
  post_id: string | null
  parent_id: string | null
  author_id: string
  body: string
  created_at: string
  updated_at: string
  profiles?: { display_name?: string; username?: string } | null
}

interface CommentsProps {
  postId: string
  user: { id: string } | null
}

export default function Comments({ postId, user }: CommentsProps) {
  const [comments, setComments] = useState<Comment[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyBody, setReplyBody] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  async function fetchComments() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comments')
      .select(`*, profiles:author_id (display_name, username)`)
      .eq('post_id', postId)
      .eq('is_removed', false)
      .order('created_at', { ascending: true })
    if (error) setError('Erro ao carregar comentários')
    setComments(data as Comment[])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      parent_id: null,
      body,
      author_id: user.id,
    })
    if (error) setError('Erro ao comentar')
    setBody('')
    await fetchComments()
    setLoading(false)
  }

  async function handleReply(e: React.FormEvent, parentId: string) {
    e.preventDefault()
    if (!replyBody.trim()) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      parent_id: parentId,
      body: replyBody,
      author_id: user.id,
    })
    if (error) setError('Erro ao responder')
    setReplyBody('')
    setReplyTo(null)
    await fetchComments()
    setLoading(false)
  }

  function renderReplies(parentId: string, level = 1) {
    if (!comments) return null
    if (level > 2) return null
    return comments
      .filter((c) => c.parent_id === parentId)
      .map((reply) => (
        <div key={reply.id} className="comment-reply" style={{ marginLeft: 24 * level }}>
          <CommentItem comment={reply} />
          {level < 2 && renderReplies(reply.id, level + 1)}
        </div>
      ))
  }

  function CommentItem({ comment }: { comment: Comment }) {
    const authorName = comment.profiles?.display_name || comment.profiles?.username || 'anônimo'
    const date = new Date(comment.created_at).toLocaleString('pt-BR')
    return (
      <div className="comment-item">
        <div className="comment-meta">
          <span className="comment-author">@{authorName}</span>
          <span className="comment-dot">·</span>
          <span className="comment-date">{date}</span>
        </div>
        <div className="comment-body">{comment.body}</div>
        {user && (
          <button className="comment-reply-btn" onClick={() => setReplyTo(comment.id)}>
            Responder
          </button>
        )}
        {replyTo === comment.id && (
          <form className="comment-form-reply" onSubmit={(e) => handleReply(e, comment.id)}>
            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Sua resposta..."
              rows={2}
              required
            />
            <button type="submit" disabled={loading}>Enviar</button>
            <button type="button" onClick={() => setReplyTo(null)}>Cancelar</button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section className="comments-section">
      <h4>Debate</h4>
      {error && <div className="comment-error">{error}</div>}
      {loading && <div className="comment-loading">Carregando...</div>}
      {/* Novo comentário */}
      {user && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Comente algo..."
            rows={2}
            required
          />
          <button type="submit" disabled={loading}>Comentar</button>
        </form>
      )}
      {/* Lista de comentários */}
      <div className="comments-list">
        {comments &&
          comments
            .filter((c) => c.parent_id === null)
            .map((comment) => (
              <div key={comment.id} className="comment-root">
                <CommentItem comment={comment} />
                {renderReplies(comment.id)}
              </div>
            ))}
        {!comments?.length && <div className="comments-empty">Nenhum comentário ainda.</div>}
      </div>
      <style>{`
        .comments-section { margin-top: var(--space-6); }
        .comment-form, .comment-form-reply { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4); }
        .comment-form textarea, .comment-form-reply textarea { width: 100%; resize: vertical; font-size: var(--text-sm); padding: var(--space-2); border-radius: var(--radius-sm); border: 1px solid var(--surface-border); }
        .comment-form button, .comment-form-reply button { font-size: var(--text-xs); margin-right: var(--space-2); }
        .comments-list { display: flex; flex-direction: column; gap: var(--space-3); }
        .comment-root { border-left: 2px solid var(--surface-border); padding-left: var(--space-3); margin-bottom: var(--space-2); }
        .comment-item { background: var(--surface-overlay); border-radius: var(--radius-sm); padding: var(--space-3); margin-bottom: var(--space-1); }
        .comment-meta { font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-1); display: flex; gap: var(--space-2); align-items: center; }
        .comment-author { font-weight: 600; color: var(--accent); }
        .comment-dot { color: var(--text-muted); }
        .comment-date { font-family: var(--font-mono); }
        .comment-body { font-size: var(--text-sm); color: var(--text-primary); margin-bottom: var(--space-2); white-space: pre-wrap; }
        .comment-reply-btn { font-size: var(--text-xs); color: var(--accent); background: none; border: none; cursor: pointer; margin-top: var(--space-1); }
        .comment-reply { margin-top: var(--space-2); }
        .comments-empty { color: var(--text-muted); font-size: var(--text-xs); margin-top: var(--space-2); }
        .comment-error { color: var(--danger); font-size: var(--text-xs); margin-bottom: var(--space-2); }
        .comment-loading { color: var(--text-secondary); font-size: var(--text-xs); margin-bottom: var(--space-2); }
      `}</style>
    </section>
  )
}
