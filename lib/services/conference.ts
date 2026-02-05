import { db } from '@/lib/db'
import { conference } from '@/lib/db/schema/conference'
import { eq, and, or, sql } from 'drizzle-orm'

export async function getConferences(options?: {
  page?: number
  limit?: number
  theme?: string
  date?: string
  search?: string
}) {
  try {
    const page = options?.page || 1
    const limit = options?.limit || 10
    const offset = (page - 1) * limit

    const conditions = []

    if (options?.theme && options.theme !== 'all') {
      conditions.push(eq(conference.theme, options.theme))
    }

    if (options?.date) {
      const dateStrings = options.date.split(',')
      const dateConditions = dateStrings.map((dateStr) => {
        const dateStart = new Date(dateStr)
        dateStart.setHours(0, 0, 0, 0)
        const dateEnd = new Date(dateStr)
        dateEnd.setHours(23, 59, 59, 999)
        return and(
          sql`${conference.startAt} >= ${dateStart.toISOString()}`,
          sql`${conference.startAt} <= ${dateEnd.toISOString()}`
        )
      })

      if (dateConditions.length > 0) {
        conditions.push(or(...dateConditions))
      }
    }

    if (options?.search) {
      const searchLower = `%${options.search.toLowerCase()}%`
      conditions.push(
        sql`(lower(${conference.title}) LIKE ${searchLower} OR lower(${conference.theme}) LIKE ${searchLower})`
      )
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const [data, totalCount] = await Promise.all([
      db.query.conference.findMany({
        where: whereClause,
        orderBy: (conferences, { asc }) => [asc(conferences.startAt)],
        limit: limit,
        offset: offset,
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(conference)
        .where(whereClause)
        .then((res) => Number(res[0]?.count || 0)),
    ])

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching conferences:', error)
    return { success: false, error: 'Failed to fetch conferences' }
  }
}
