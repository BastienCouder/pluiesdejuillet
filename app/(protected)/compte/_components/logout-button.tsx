'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { link } from '@/constants/link'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/auth/sign-out', { method: 'POST' })
    router.push(link.login)
    router.refresh()
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="w-full"
      disabled={loading}
    >
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </Button>
  )
}
