import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token')
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'page')
  revalidatePath('/blog', 'page')
  revalidatePath('/blog/[slug]', 'page')

  return NextResponse.json({ revalidated: true })
}
