import { signInService } from '@/lib/services/auth'
import { signInSchema } from '@/lib/validators/auth'
import { rateLimit } from '@/lib/rate-limit'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const isAllowed = rateLimit(ip, { limit: 5, windowMs: 60 * 1000 })
    if (!isAllowed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trop de tentatives. Veuillez réessayer plus tard.',
        },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = signInSchema.safeParse(body)

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

    const { email, password } = validation.data
    const result = await signInService(email, password)

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
