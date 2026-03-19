'use client'

/**
 * PostForm – Nika Web
 *
 * Componente para criação de posts simples.
 * Usado dentro das páginas de comunidades.
 */

import { createPostAction } from '@/lib/communities/actions'
import { useTransition, useRef } from 'react'

interface PostFormProps {
  communityId: string
  communitySlug: string
}

export default function PostForm({ communityId, communitySlug }: PostFormProps) {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createPostAction(formData)
      formRef.current?.reset()
    })
  }

  return (
    <div className="post-form-card">
      <form ref={formRef} action={handleSubmit} className="post-form">
        <input type="hidden" name="community_id" value={communityId} />
        <input type="hidden" name="community_slug" value={communitySlug} />

        <div className="post-form__fields">
          <input
            name="title"
            type="text"
            className="post-form__title"
            placeholder="Título (opcional)"
            autoComplete="off"
            disabled={isPending}
          />

          <textarea
            name="body"
            className="post-form__body"
            placeholder="Diga algo ao coletivo..."
            required
            disabled={isPending}
            rows={3}
          />
        </div>

        <div className="post-form__footer">
          <button type="submit" className="post-form__btn" disabled={isPending}>
            {isPending ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>

      <style>{`
        .post-form-card {
          background-color: var(--surface-raised);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-md);
          padding: var(--space-5);
          margin-bottom: var(--space-8);
        }
        .post-form { display: flex; flex-direction: column; gap: var(--space-4); }
        .post-form__fields { display: flex; flex-direction: column; gap: var(--space-2); }
        .post-form__title {
          width: 100%; padding: var(--space-2) 0;
          background: none; border: none; border-bottom: 1px solid transparent;
          color: var(--text-primary); font-size: var(--text-base); font-weight: 600;
          font-family: var(--font-sans); outline: none; transition: border-color 0.2s;
        }
        .post-form__title:focus { border-color: var(--concrete-600); }
        .post-form__title::placeholder { color: var(--text-muted); opacity: 0.6; }

        .post-form__body {
          width: 100%; padding: var(--space-2) 0;
          background: none; border: none;
          color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.6;
          font-family: var(--font-sans); outline: none; resize: none;
        }
        .post-form__body::placeholder { color: var(--text-muted); }

        .post-form__footer { display: flex; justify-content: flex-end; padding-top: var(--space-2); border-top: 1px solid var(--surface-border); }
        .post-form__btn {
          background-color: var(--accent); color: var(--text-inverse);
          border: none; border-radius: var(--radius-sm); padding: var(--space-2) var(--space-6);
          font-size: var(--text-xs); font-weight: 700; font-family: var(--font-mono);
          text-transform: uppercase; cursor: pointer; transition: background-color 0.2s;
        }
        .post-form__btn:hover:not(:disabled) { background-color: var(--accent-dim); }
        .post-form__btn:disabled { opacity: 0.5; cursor: wait; }
      `}</style>
    </div>
  )
}
