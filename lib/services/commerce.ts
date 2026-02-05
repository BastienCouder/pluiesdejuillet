import { db } from '@/lib/db'
import { ticket } from '@/lib/db/schema/commerce'
import { eq, and } from 'drizzle-orm'

export async function getUserTickets(userId: string) {
  if (!userId) return []
  try {
    const tickets = await db.query.ticket.findMany({
      where: and(eq(ticket.userId, userId), eq(ticket.status, 'VALID')),
      with: {
        type: true,
      },
    })

    return tickets
  } catch (error) {
    console.error('Error fetching user tickets:', error)
    return []
  }
}
