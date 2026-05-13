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

function cmsGuestToFitecLead(guest: CmsGuest): FitecLead {
  const firstPost = guest.posts?.[0];
  return {
    id: guest.id,
    name: guest.name?.trim() || "Visitante FITEC",
    text: firstPost?.message ?? null,
    image: firstPost?.imageUrl ?? IMAGE_FALLBACK,
  };
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

export async function fetchFitecLeads(): Promise<FitecLead[]> {
  try {
    const res = await fetch(GUESTS_URL, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as CmsGuestsResponse;
    if (!data.ok || !Array.isArray(data.data)) return [];
    return data.data.map(cmsGuestToFitecLead);
  } catch (error) {
    console.error("[fitec-api] Erro ao buscar guests:", error);
    return [];
  }
}
