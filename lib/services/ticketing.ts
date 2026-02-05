import { db } from '@/lib/db'
import { ticketType, ticket } from '@/lib/db/schema/commerce'
import { eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export async function generateTicketForUser(userId: string) {
  try {
    const existingTicket = await db.query.ticket.findFirst({
      where: and(eq(ticket.userId, userId), eq(ticket.status, 'VALID')),
    })

    if (existingTicket) {
      return { success: false, error: 'User already has a ticket' }
    }

    let defaultTicketType = await db.query.ticketType.findFirst({
      where: eq(ticketType.name, 'Pass Gratuit'),
    })

    if (!defaultTicketType) {
      const [newType] = await db
        .insert(ticketType)
        .values({
          name: 'Pass Gratuit',
          description: 'Accès complet au festival',
          isActive: true,
        })
        .returning()
      defaultTicketType = newType
    }

    await db.insert(ticket).values({
      userId: userId,
      ticketTypeId: defaultTicketType.id,
      status: 'VALID',
      qrCode: uuidv4(),
    })

    return { success: true }
  } catch (error) {
    console.error('Error generating ticket:', error)
    return { success: false, error: 'Failed to generate ticket' }
  }
}
