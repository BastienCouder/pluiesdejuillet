import { signUpService } from '@/lib/services/auth'
import { signUpSchema } from '@/lib/validators/auth'
import { rateLimit } from '@/lib/rate-limit'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const isAllowed = rateLimit('sign-up:' + ip, { limit: 3, windowMs: 60 * 60 * 1000 })

    if (!isAllowed.success) {
      return NextResponse.json(
        { success: false, error: 'Trop de tentatives de création de compte.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = signUpSchema.safeParse(body)

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

    const { email, password, firstName, lastName, rgpdConsent } =
      validation.data

    const result = await signUpService(
      email,
      password,
      firstName,
      lastName,
      rgpdConsent
    )

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
