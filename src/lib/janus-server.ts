const JANUS_URL = process.env.NEXT_PUBLIC_JANUS_URL ?? "";
const JANUS_TENANT = process.env.NEXT_PUBLIC_JANUS_TENANT ?? "";

/**
 * Fetches all content blocks for a Janus page server-side.
 * Returns the `schema.content` record (blockId → data) or null on failure.
 * Uses ISR revalidate: 60 so the content stays fresh without a deploy.
 */
export async function fetchJanusBlocks(
  pageSlug: string
): Promise<Record<string, unknown> | null> {
  if (!JANUS_URL || !JANUS_TENANT) return null;
  try {
    const res = await fetch(
      `${JANUS_URL}/api/v1/content/${JANUS_TENANT}/${pageSlug}`,
      { next: { tags: [`janus-page-${pageSlug}`] } }
    );
    if (!res.ok) return null;
    const page = await res.json();
    return (page?.schema?.content as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}
