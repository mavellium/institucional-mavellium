import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/ui/footer";
import { BlogCard } from "../../components/ui/blog-card";
import { BlogGrid } from "./_components/BlogGrid";
import { getAllPosts } from "../../lib/blog";
import { getWhatsappUrl } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Blog & Insights | Mavellium",
  description:
    "Artigos, tendências e análises profundas sobre como a tecnologia, automação e design impactam o faturamento da sua empresa.",
  openGraph: {
    title: "Blog & Insights | Mavellium",
    description:
      "Artigos, tendências e análises profundas sobre como a tecnologia, automação e design impactam o faturamento da sua empresa.",
    type: "website",
  },
};

const NAV_LINKS = [
  { name: "Início", href: "/" },
  { name: "Soluções", href: "/#solucoes" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: getWhatsappUrl("Olá! Vim pelo blog da Mavellium e gostaria de conversar.") },
];

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header
        lightBg
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={getWhatsappUrl("Olá! Vim pelo blog e gostaria de falar com um especialista.")}
        ctaText="Falar com Especialista"
      />

      <main className="bg-white min-h-screen">
        {/* Hero section */}
        <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-zinc-100">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_top,#f4f4f5_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]"
            aria-hidden
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-5">
              Mavellium Insights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 mb-4 max-w-3xl">
              Blog &{" "}
              <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl">
              Análises profundas e perspectivas práticas sobre como tecnologia,
              automação e design constroem vantagem competitiva real.
            </p>
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
            <BlogCard post={featured} variant="featured" priority />
          </section>
        )}

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-zinc-100" />
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
              Todos os artigos
            </span>
            <div className="flex-1 h-px bg-zinc-100" />
          </div>
        </div>

        {/* Filtered grid */}
        <BlogGrid posts={rest} />
      </main>

      <Footer />
    </>
  );
}
