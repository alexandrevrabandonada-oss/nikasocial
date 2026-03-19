'use client'

/**
 * LogoutButton – Nika Web
 *
 * Client Component que chama a Server Action de logout.
 * Pode ser usado em qualquer lugar do layout autenticado.
 */

import { logoutAction } from '@/lib/auth/actions'
import { useTransition } from 'react'

export default function LogoutButton({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={className}
      style={{ cursor: isPending ? 'wait' : 'pointer' }}
    >
      {isPending ? 'Saindo...' : 'Sair'}
    </button>
  )
}
