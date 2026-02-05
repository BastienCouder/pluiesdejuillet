import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await auth.api.signOut({
      headers: await headers(),
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Échec de la déconnexion',
      },
      { status: 500 }
    )
  }
}
