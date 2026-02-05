import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TicketQRZoom } from '@/app/(protected)/compte/_components/ticketing/ticket-qr-zoom'
import { link } from '@/constants/link'
import AccountForm from './_components/account-form'
import LogoutButton from './_components/logout-button'
import DeleteAccountButton from './_components/delete-account-button'
import { fetchClient } from '@/lib/fetch-client'

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect(link.login)
  }

  const [userProfile, tickets] = await Promise.all([
    fetchClient('/api/profile'),
    fetchClient('/api/tickets/user'),
  ])

  const activeTicket = tickets.find((t: any) => t.status === 'VALID')

  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 flex items-center gap-4">
        <h1 className="font-display text-accent text-3xl font-bold tracking-widest uppercase">
          Mon Compte
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card className="border-accent bg-primary border-3">
            <CardHeader>
              <CardTitle className="font-display tracking-wider uppercase">
                Informations Personnelles
              </CardTitle>
              <CardDescription className="text-foreground">
                Gérez vos informations de connexion et de profil.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccountForm
                initialFirstName={userProfile?.firstName || ''}
                initialLastName={userProfile?.lastName || ''}
                initialEmail={session.user.email}
              />
            </CardContent>
          </Card>

          <Card className="border-accent bg-primary border-3">
            <CardContent>
              <LogoutButton />
            </CardContent>
          </Card>

          <Card className="border-accent bg-primary border-3">
            <CardContent>
              <DeleteAccountButton />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <h2 className="font-display text-accent mb-4 flex items-center gap-2 text-xl font-bold tracking-wider uppercase">
            Mon Billet
          </h2>

          {activeTicket ? (
            <Card className="border-accent from-primary to-primary/90 text-primary-foreground relative overflow-hidden border-2 bg-gradient-to-br shadow-xl">
              <div className="bg-background absolute top-1/2 -left-4 z-10 h-8 w-8 -translate-y-1/2 rounded-full" />
              <div className="bg-background absolute top-1/2 -right-4 z-10 h-8 w-8 -translate-y-1/2 rounded-full" />

              <CardHeader className="border-b border-dashed border-white/10 pb-2 text-center">
                <CardTitle className="font-display text-accent-foreground/90 text-lg tracking-widest uppercase">
                  {activeTicket.type.name}
                </CardTitle>
                <div className="font-display my-2 text-4xl font-bold">
                  {`${userProfile?.firstName} ${userProfile?.lastName}`}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4 pt-6">
                <div className="rounded-lg bg-white p-2 shadow-inner">
                  <TicketQRZoom ticketCode={activeTicket.qrCode} />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
