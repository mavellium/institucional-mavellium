import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { BlogCard } from "../../../components/ui/blog-card";
import { ArticleRenderer } from "./_components/ArticleRenderer";
import { TableOfContents } from "./_components/TableOfContents";
import { ShareBar } from "./_components/ShareBar";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  CATEGORY_COLORS,
} from "../../../lib/blog";
import { getWhatsappUrl } from "../../../lib/constants";
import { cn } from "@/src/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Mavellium Blog`,
    description: post.seoDescription ?? post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

const NAV_LINKS = [
  { name: "Início", href: "/" },
  { name: "Quem Somos", href: "/#quem-somos" },
  { name: "Soluções", href: "/#solucoes" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: getWhatsappUrl("Olá! Vim pelo blog da Mavellium e gostaria de conversar.") },
];

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs);
  const colors = CATEGORY_COLORS[post.category];

  const whatsappMsg = getWhatsappUrl(
    `Olá! Li o artigo "${post.title}" no blog da Mavellium e gostaria de conversar sobre implementar isso na minha empresa.`
  );

  return (
    <>
      <Header
        lightBg
        logo="/logo-mavellium-header.svg"
        logoAlt="Mavellium"
        links={NAV_LINKS}
        ctaLink={whatsappMsg}
        ctaText="Falar com Especialista"
      />

      <main className="bg-white">
        {/* Breadcrumb */}
        <nav className="pt-28 pb-4 px-6 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-zinc-400">
            <Link href="/blog" className="hover:text-zinc-700 transition-colors">
              Blog
            </Link>
            <ChevronRight className="size-3.5 flex-shrink-0" />
            <span className={cn("font-medium", colors.text)}>
              {post.category}
            </span>
            <ChevronRight className="size-3.5 flex-shrink-0" />
            <span className="text-zinc-600 line-clamp-1 font-medium">
              {post.title}
            </span>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
            {/* Main content */}
            <article>
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                Voltar ao blog
              </Link>

              {/* Category badge */}
              <div
                className={cn(
                  "flex-col w-fit items-center rounded-full mx-2 px-3 py-1 text-xs font-semibold border mb-5",
                  colors.bg,
                  colors.text,
                  colors.border
                )}
              >
                {post.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
                {post.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0",
                      post.author.avatarColor
                    )}
                  >
                    {post.author.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-zinc-400">{post.author.role}</p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-zinc-200" />
                <time
                  dateTime={post.publishedAt}
                  className="text-sm text-zinc-500"
                >
                  {formatDate(post.publishedAt)}
                </time>
                <div className="hidden sm:block w-px h-8 bg-zinc-200" />
                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Clock className="size-4" />
                  {post.readingTimeMinutes} min de leitura
                </div>
              </div>

              {/* Cover image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 280px - 6rem)"
                />
              </div>

              {/* Article body */}
              <ArticleRenderer sections={post.body} category={post.category} />

              {/* Share bar */}
              <ShareBar post={post} />

              {/* WhatsApp CTA */}
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  Quer implementar isso no seu negócio?
                </h3>
                <p className="text-zinc-500 mb-6">
                  Converse com nossa equipe de especialistas e descubra como
                  aplicar essas estratégias na realidade da sua empresa.
                </p>
                <a
                  href={whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                >
                  Falar com Especialista no WhatsApp
                </a>
              </div>
            </article>

            {/* Sidebar — Table of Contents */}
            <aside className="hidden lg:block">
              <TableOfContents sections={post.body} />
            </aside>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-zinc-100 bg-zinc-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-zinc-900 mb-8">
                Artigos relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel, i) => (
                  <BlogCard key={rel.slug} post={rel} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
