'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { IconLoader } from '@tabler/icons-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface AccountFormProps {
  initialFirstName: string
  initialLastName: string
  initialEmail: string
}

export default function AccountForm({
  initialFirstName,
  initialLastName,
  initialEmail,
}: AccountFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [email, setEmail] = useState(initialEmail)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})
    setSuccess(false)

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    })

    const data = await response.json()

    if (data.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(data.error || 'Impossible de mettre à jour le profil')
      setFieldErrors(data.fieldErrors || {})
    }

    setLoading(false)
  }

  return (
    <>
      {error && (
        <Alert
          className="mb-4 rounded-none border-2 border-white bg-white/10 text-white"
          variant="default"
        >
          <AlertDescription className="font-semibold text-white">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 rounded-none border-2 border-white bg-white/10 text-white">
          <AlertDescription className="text-white">
            Profil mis à jour avec succès !
          </AlertDescription>
        </Alert>
      )}

      <form className="lg:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              id="firstName"
              type="text"
              aria-invalid={!!fieldErrors.firstName}
              aria-describedby={
                fieldErrors.firstName ? 'firstName-error' : undefined
              }
              className={cn(
                'focus-visible:ring-accent',
                fieldErrors.firstName
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              )}
              required
            />
            {fieldErrors.firstName && (
              <p
                id="firstName-error"
                className="text-xs font-bold text-red-500"
              >
                {fieldErrors.firstName[0]}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              id="lastName"
              type="text"
              aria-invalid={!!fieldErrors.lastName}
              aria-describedby={
                fieldErrors.lastName ? 'lastName-error' : undefined
              }
              className={cn(
                'focus-visible:ring-accent',
                fieldErrors.lastName
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              )}
              required
            />
            {fieldErrors.lastName && (
              <p id="lastName-error" className="text-xs font-bold text-red-500">
                {fieldErrors.lastName[0]}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="email@exemple.com"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={cn(
                'focus-visible:ring-accent',
                fieldErrors.email
                  ? 'border-red-500 focus-visible:ring-red-500'
                  : ''
              )}
              required
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs font-bold text-red-500">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button disabled={loading} type="submit">
              {loading ? (
                <IconLoader className="animate-spin" stroke={2} />
              ) : (
                'Enregistrer'
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
