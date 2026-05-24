import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token')
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('janus-page-home', {})
  revalidatePath('/', 'page')
  revalidatePath('/blog', 'page')
  revalidatePath('/blog/[slug]', 'page')
  revalidatePath('/llms.txt', 'page')
  revalidatePath('/llms-full.txt', 'page')

  return NextResponse.json({ revalidated: true })
}
