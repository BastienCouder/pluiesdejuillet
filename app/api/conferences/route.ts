import { getConferences } from '@/lib/services/conference'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const options = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      theme: searchParams.get('theme') || undefined,
      date: searchParams.get('date') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const result = await getConferences(options)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
