const GUESTS_URL = "https://janus.187.77.236.241.nip.io/api/v1/admin/guests";

const IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1280";

// ─── Raw API types ───────────────────────────────────────────────────────────

interface CmsCompany {
  id: string;
  name: string;
  slug: string;
}

interface CmsGuest {
  id: string;
  name: string;
  email: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  company: CmsCompany;
  posts: CmsPost[];
}

interface CmsPost {
  id?: string;
  imageUrl?: string;
  message?: string;
  title?: string;
}

interface CmsGuestsResponse {
  ok: boolean;
  data: CmsGuest[];
}

// ─── Normalized type (consumed by components) ────────────────────────────────

export interface FitecLead {
  id: string;
  name: string;
  text: string | null;
  image: string;
}

// ─── Adapter ─────────────────────────────────────────────────────────────────

function cmsGuestToFitecLeads(guest: CmsGuest): FitecLead[] {
  const name = guest.name?.trim() || "Visitante FITEC";
  if (!guest.posts?.length) return [];
  return guest.posts.map((post) => ({
    id: post.id ?? guest.id,
    name,
    text: post.message ?? null,
    image: post.imageUrl ?? IMAGE_FALLBACK,
  }));
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

export async function fetchFitecLeads(): Promise<FitecLead[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(GUESTS_URL, { cache: "no-store", signal: controller.signal });
    if (!res.ok) return [];
    const data = (await res.json()) as CmsGuestsResponse;
    if (!data.ok || !Array.isArray(data.data)) return [];
    return [...data.data]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .flatMap(cmsGuestToFitecLeads);
  } catch (error) {
    console.error("[fitec-api] Erro ao buscar guests:", error);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
