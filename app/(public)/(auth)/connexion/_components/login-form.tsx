'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn, translateAuthError } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '../../../../../components/ui/alert'
import { IconLoader } from '@tabler/icons-react'
import { link } from '@/constants/link'
import Link from 'next/link'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})

    const result = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await result.json()

    if (data.success) {
      router.push(link.account)
      router.refresh()
    } else {
      setError(translateAuthError({ message: data?.error }))
      setFieldErrors(data?.fieldErrors || {})
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border-accent bg-primary border-3">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-display text-2xl font-bold tracking-wider uppercase">
            Connexion
          </CardTitle>
          <CardDescription className="text-base font-medium text-black">
            Entrez vos identifiants pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold tracking-wide uppercase"
                >
                  Email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email ? 'email-error' : undefined
                  }
                  placeholder="exemple@email.com"
                  className={cn(
                    'focus-visible:ring-accent',
                    fieldErrors.email
                      ? 'border-white focus-visible:ring-white'
                      : 'border-input'
                  )}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-xs font-bold text-white">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold tracking-wide uppercase"
                >
                  Mot de passe
                </Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  type="password"
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby={
                    fieldErrors.password ? 'password-error' : undefined
                  }
                  className={cn(
                    'focus-visible:ring-accent',
                    fieldErrors.password
                      ? 'border-white focus-visible:ring-white'
                      : 'border-input'
                  )}
                />
                {fieldErrors.password && (
                  <p
                    id="password-error"
                    className="text-xs font-bold text-white"
                  >
                    {fieldErrors.password[0]}
                  </p>
                )}
              </div>
              <div className="mt-2 flex flex-col gap-4">
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary h-12 w-full rounded-none border-3 font-bold tracking-widest text-black uppercase transition-all duration-300"
                >
                  {loading ? (
                    <IconLoader className="animate-spin" stroke={2} />
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm font-medium">
              Pas encore de compte ?{' '}
              <Link
                href={link.signup}
                className="hover:text-accent font-bold underline underline-offset-4 transition-colors"
              >
                S&apos;inscrire
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
