import { auth } from '@/lib/auth'
import { updateProfileService } from '@/lib/services/profile'
import { updateProfileSchema } from '@/lib/validators/profile'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { profile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json(null, { status: 401 })
    }

    const userProfile = await db.query.profile.findFirst({
      where: eq(profile.userId, session.user.id),
    })

    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Non authentifié',
        },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validation = updateProfileSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors[0].message,
          fieldErrors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { firstName, lastName, email } = validation.data

    const result = await updateProfileService(
      session.user.id,
      firstName,
      lastName,
      email
    )
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
