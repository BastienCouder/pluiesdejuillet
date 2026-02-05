import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { user } from './auth'

export const ticketType = pgTable('ticket_type', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(), // Pass Gratuit
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  validFrom: timestamp('valid_from'),
  validUntil: timestamp('valid_until'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const ticket = pgTable('ticket', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  ticketTypeId: uuid('ticket_type_id')
    .notNull()
    .references(() => ticketType.id),
  status: text('status').notNull().default('VALID'), // VALID, USED, CANCELED
  qrCode: text('qr_code').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const ticketTypeRelations = relations(ticketType, ({ many }) => ({
  tickets: many(ticket),
}))

export const ticketRelations = relations(ticket, ({ one }) => ({
  user: one(user, {
    fields: [ticket.userId],
    references: [user.id],
  }),
  type: one(ticketType, {
    fields: [ticket.ticketTypeId],
    references: [ticketType.id],
  }),
}))
