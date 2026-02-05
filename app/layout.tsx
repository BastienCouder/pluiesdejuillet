import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Les Pluies de Juillet',
  description:
    'Plateforme de conférences pour le festival Les Pluies de Juillet',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar user={session?.user} />
        <main className="bg-primary flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
