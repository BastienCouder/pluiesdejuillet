import { fetchClient } from '@/lib/fetch-client'
import { ConferenceCard } from '@/app/(public)/conferences/_components/conference-card'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { link } from '@/constants/link'

export default async function MyProgramPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect(link.login)
  }

  const [programRes, ticketsRes] = await Promise.all([
    fetchClient('/api/program'),
    fetchClient('/api/tickets/user'),
  ])

  const program = programRes.data?.map((item: any) => item.conference) || []
  const tickets = ticketsRes || []

  const allowedRanges = tickets
    .map((t: any) => ({
      start: t.type.validFrom ? new Date(t.type.validFrom).getTime() : null,
      end: t.type.validUntil ? new Date(t.type.validUntil).getTime() : null,
    }))
    .filter((r: any) => r.start && r.end)

  const hasUnlimitedAccess = tickets.some(
    (t: any) => !t.type.validFrom && !t.type.validUntil
  )

  const groupedByDay: Record<string, any[]> = {}
  program.forEach((conf: any) => {
    const date = new Date(conf.startAt)
    const key = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    if (!groupedByDay[key]) {
      groupedByDay[key] = []
    }
    groupedByDay[key].push(conf)
  })

  const sortedDays = Object.keys(groupedByDay).sort((a, b) => {
    return groupedByDay[a][0].startAt > groupedByDay[b][0].startAt ? 1 : -1
  })

  return (
    <div className="container py-10">
      <div className="mb-10 text-center">
        <h1 className="font-display text-foreground mb-4 text-2xl font-bold tracking-widest uppercase lg:text-4xl">
          Mon <span className="text-accent">Programme</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl">
          Retrouvez ici toutes les conférences que vous avez sélectionnées.
        </p>
      </div>

      {!program || program.length === 0 ? (
        <div className="border-secondary/20 mx-auto max-w-2xl rounded-3xl border-2 border-dashed py-20 text-center">
          <p className="text-foreground mb-4 text-lg font-medium">
            Votre programme est vide pour le moment.
          </p>
          <Link href={link.conferences}>
            <Button variant="default">Découvrir les conférences</Button>
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl space-y-12">
          {sortedDays.map((day) => (
            <div key={day}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-display text-accent text-lg font-bold tracking-widest whitespace-nowrap uppercase lg:text-2xl">
                  {day}
                </h2>
                <div className="bg-border h-px w-full" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedByDay[day]
                  .sort(
                    (a, b) =>
                      new Date(a.startAt).getTime() -
                      new Date(b.startAt).getTime()
                  )
                  .map((conf: any) => (
                    <ConferenceCard
                      key={conf.id}
                      conference={conf}
                      isInProgram={true}
                      isLoggedIn={true}
                      allowedRanges={allowedRanges}
                      hasUnlimitedAccess={hasUnlimitedAccess}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
