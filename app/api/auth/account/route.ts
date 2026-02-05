import { auth } from '@/lib/auth'
import { deleteAccountService } from '@/lib/services/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
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

    const result = await deleteAccountService(session.user.id)

    if (result.success) {
      await auth.api.signOut({
        headers: await headers(),
      })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Échec de la suppression du compte',
      },
      { status: 500 }
    )
  }
}
