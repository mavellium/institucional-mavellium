import type { MetadataRoute } from "next";
import { fetchCmsAllSlugs } from "../lib/blog-api";

const BASE_URL = "https://mavellium.com.br";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                                     priority: 1.0,  changeFrequency: "weekly" },
  { url: `${BASE_URL}/solucoes`,                       priority: 0.9,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/quem-somos`,                     priority: 0.8,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/cases`,                          priority: 0.8,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/cases/performance-arquitetura`,  priority: 0.7,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/geo`,                            priority: 0.8,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/blog`,                           priority: 0.8,  changeFrequency: "daily"   },
  { url: `${BASE_URL}/eventos`,                        priority: 0.7,  changeFrequency: "weekly"  },
  { url: `${BASE_URL}/eventos/fitec-2026`,             priority: 0.6,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/docs`,                           priority: 0.6,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/docs/janus-cms`,                 priority: 0.5,  changeFrequency: "monthly" },
  { url: `${BASE_URL}/docs/janus-sdk`,                 priority: 0.5,  changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchCmsAllSlugs();

  const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...STATIC_ROUTES, ...blogRoutes];
}
