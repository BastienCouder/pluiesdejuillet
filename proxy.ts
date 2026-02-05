import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { link } from './constants/link'
import { checkRateLimit } from './lib/rate-limit'

export async function proxy(request: NextRequest) {
  const { rateLimited } = await checkRateLimit(request)

  if (rateLimited) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  if (sessionCookie && [link.login, link.signup].includes(pathname)) {
    return NextResponse.redirect(new URL(link.conferences, request.url))
  }

  if (
    !sessionCookie &&
    ![
      link.login,
      link.signup,
      link.conferences,
      link.politiqueConfidentialite,
      link.mentionsLegales,
    ].includes(pathname)
  ) {
    return NextResponse.redirect(new URL(link.signup, request.url))
  }

  if (pathname === link.app) {
    return NextResponse.redirect(new URL(link.conferences, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
