// src/lib/fitec-api.ts
// CMS API client — adapta a resposta do endpoint do Janus para o formato consumido pelos componentes.

// ─── Environment ────────────────────────────────────────────────────────────

// Se a API estiver hospedada no mesmo domínio do Next.js, utilize a URL base.
// Caso seja um domínio externo da VPS/Janus, utilize a env correspondente.
const API_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function isConfigured(): boolean {
  return Boolean(API_URL);
}

function fitecUrl() {
  return `${API_URL}/api/itc-mavellium/json/fitec-2026`;
}

// ─── Raw CMS types ───────────────────────────────────────────────────────────

export interface CmsFitecLead {
  id: string;
  name: string | null;
  role?: string | null;
  image?: string;
  email?: string; 
  phone?: string; 
  createdAt?: string;
}

// NOVA INTERFACE: Reflete o novo formato da API que envelopa a lista em "card"
export interface CmsFitecResponse {
  card: CmsFitecLead[];
}

// ─── Normalized Post type (consumed by components) ───────────────────────────

export interface FitecLead {
  id: string;
  name: string;
  role: string | null;
  image: string;
}

// ─── Adapter: CmsFitecLead → FitecLead ───────────────────────────────────────

function cmsToFitecLead(lead: CmsFitecLead): FitecLead {
  return {
    id: lead.id,
    // Garante um fallback caso o nome não seja preenchido (já que é opcional)
    name: lead.name?.trim() ? lead.name : "Visitante FITEC",
    role: lead.role ?? null,
    // Imagem de fallback caso não venha do Janus
    image: lead.image ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1280", 
  };
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Erro ao buscar dados de ${url}:`, error);
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function fetchFitecLeads(): Promise<FitecLead[]> {
  if (!isConfigured()) return [];

  // Tipamos o fetch para esperar o objeto resposta com a chave 'card'
  const data = await fetchJson<CmsFitecResponse>(fitecUrl());
  
  // Extraímos o array. Se a API falhar ou não retornar 'card', caímos para um array vazio
  const leadsArray = data?.card ?? [];

  // Mapeamos o array limpo
  return leadsArray.map(cmsToFitecLead);
}