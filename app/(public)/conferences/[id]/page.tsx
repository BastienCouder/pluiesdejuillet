import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { conference, userProgramItem } from '@/lib/db/schema/conference'
import { eq, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const conf = await db.query.conference.findFirst({
    where: eq(conference.id, id),
  })

  if (!conf) {
    notFound()
  }

  const session = await auth.api.getSession({ headers: await headers() })
  let isInProgram = false

  if (session?.user) {
    const item = await db.query.userProgramItem.findFirst({
      where: and(
        eq(userProgramItem.userId, session.user.id),
        eq(userProgramItem.conferenceId, id)
      ),
    })
    isInProgram = !!item
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link
        href="/conferences"
        className="text-accent hover:text-accent mb-6 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} /> Retour au conférences
      </Link>

      <div className="border-accent border-4 p-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="flex-1">
            <div className="bg-accent text-foreground mb-4 inline-block rounded px-3 py-1 text-sm font-bold uppercase">
              {conf.theme}
            </div>
            <h1 className="font-display text-festival-black mb-6 text-4xl font-bold uppercase md:text-5xl">
              {conf.title}
            </h1>

            <div className="mb-8 flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="text-accent" />
                <span className="font-bold">
                  {new Date(conf.startAt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-accent" />
                <span className="font-bold">
                  {new Date(conf.startAt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {' - '}
                  {new Date(conf.endAt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {conf.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="text-accent" />
                  <span>{conf.location}</span>
                </div>
              )}
            </div>

            <div className="prose mb-8 max-w-none text-lg leading-relaxed">
              {conf.description}
            </div>

            {conf.speakerName && (
              <>
                <p className="text-sm font-bold uppercase">Intervenant :</p>
                <p className="text-xl font-bold">{conf.speakerName}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
