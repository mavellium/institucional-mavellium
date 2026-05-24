export async function fetchJson<T>(url: string, tags?: string[]): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { tags: tags ?? ['janus-blog'] } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
