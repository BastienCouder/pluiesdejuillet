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
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '../../../../../components/ui/alert'
import { IconLoader } from '@tabler/icons-react'
import { link } from '@/constants/link'
import Link from 'next/link'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rgpdConsent, setRgpdConsent] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setFieldErrors({})

    if (!rgpdConsent) {
      setError('Vous devez accepter la politique de confidentialité')
      setFieldErrors({
        rgpdConsent: ['Vous devez accepter la politique de confidentialité'],
      })
      setLoading(false)
      return
    }

    const result = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        rgpdConsent,
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
            Créer un compte
          </CardTitle>
          <CardDescription className="text-base font-medium text-black">
            Commencez avec votre nouveau compte
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
              <div className="flex flex-row gap-6">
                <div className="grid w-full gap-3">
                  <Label
                    htmlFor="firstName"
                    className="text-xs font-bold tracking-wide uppercase"
                  >
                    Prénom
                  </Label>
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
                        ? 'border-white focus-visible:ring-white'
                        : 'border-input'
                    )}
                  />
                  {fieldErrors.firstName && (
                    <p
                      id="firstName-error"
                      className="text-xs font-bold text-white"
                    >
                      {fieldErrors.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="grid w-full gap-3">
                  <Label
                    htmlFor="lastName"
                    className="text-xs font-bold tracking-wide uppercase"
                  >
                    Nom
                  </Label>
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
                        ? 'border-white focus-visible:ring-white'
                        : 'border-input'
                    )}
                  />
                  {fieldErrors.lastName && (
                    <p
                      id="lastName-error"
                      className="text-xs font-bold text-white"
                    >
                      {fieldErrors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>
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
                  placeholder="email@exemple.com"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={
                    fieldErrors.email ? 'email-error' : undefined
                  }
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
              <div className="flex flex-col gap-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="rgpd"
                    checked={rgpdConsent}
                    onCheckedChange={(checked) =>
                      setRgpdConsent(checked as boolean)
                    }
                    className={cn(
                      fieldErrors.rgpdConsent
                        ? 'border-white'
                        : 'data-[state=checked]:bg-accent border-black data-[state=checked]:text-black'
                    )}
                  />
                  <Label
                    htmlFor="rgpd"
                    className={cn(
                      'text-xs leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      fieldErrors.rgpdConsent ? 'text-white' : ''
                    )}
                  >
                    J&apos;accepte la{' '}
                    <Link
                      href={link.politiqueConfidentialite}
                      className="hover:text-accent font-bold underline underline-offset-4"
                    >
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>
                {fieldErrors.rgpdConsent && (
                  <p className="ml-6 text-xs font-bold text-white">
                    {fieldErrors.rgpdConsent[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  disabled={loading || !rgpdConsent}
                  type="submit"
                  className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary h-12 w-full rounded-none border-3 font-bold tracking-widest text-black uppercase transition-all duration-300"
                >
                  {loading ? (
                    <IconLoader className="animate-spin" stroke={2} />
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm font-medium">
              Vous avez déjà un compte ?{' '}
              <Link
                href={link.login}
                className="hover:text-accent font-bold underline underline-offset-4 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
