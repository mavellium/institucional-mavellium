import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fetch fresh data from Janus and overwrite the local JSON cache
  const { refreshJanusCache } = await import("../../../lib/janus-cache");
  await refreshJanusCache();

  // 2. Invalidate Next.js page cache so ISR regenerates with the new JSON
  revalidateTag("janus-page-home", {});
  revalidateTag("janus-blog", {});
  revalidatePath("/", "layout");
  revalidatePath("/blog", "layout");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/llms.txt", "page");
  revalidatePath("/llms-full.txt", "page");

  return NextResponse.json({ revalidated: true, updatedAt: new Date().toISOString() });
}
