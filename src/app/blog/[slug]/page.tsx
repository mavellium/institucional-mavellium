import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/ui/footer";
import { BlogCard } from "../../../components/ui/blog-card";
import { HtmlArticleRenderer } from "./_components/HtmlArticleRenderer";
import { TableOfContents } from "./_components/TableOfContents";
import { ShareBar } from "./_components/ShareBar";
import {
  fetchCmsPostBySlug,
  fetchCmsRelatedPosts,
  type CmsPost,
} from "../../../lib/blog-api";
import { formatDate, getCategoryStyle } from "../../../lib/blog";
import { getWhatsappUrl, NAV_LINKS } from "../../../lib/constants";
import { cn } from "@/src/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { fetchCmsAllSlugs } = await import("../../../lib/blog-api");
  const slugs = await fetchCmsAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchCmsPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.seoTitle ?? post.title} | Mavellium Blog`,
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

function CmsPostArticle({ post, related }: { post: CmsPost; related: CmsPost[] }) {
  const colors = getCategoryStyle(post.category);
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
        <nav className="pt-28 pb-4 px-6 border-b border-zinc-200">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            <Link href="/blog" className="hover:text-zinc-800 transition-colors">
              Blog
            </Link>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className={cn(colors.text)}>{post.category}</span>
            <ChevronRight className="size-3 flex-shrink-0" />
            <span className="text-zinc-600 line-clamp-1">{post.title}</span>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
            <article>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#00D26A] transition-colors mb-8 group"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                Voltar ao blog
              </Link>

              <div
                className={cn(
                  "flex-col w-fit items-center rounded-sm mx-0 px-3 py-1 text-[10px] uppercase tracking-widest font-bold border shadow-sm mb-5",
                  colors.bg,
                  colors.text,
                  colors.border
                )}
              >
                {post.category}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold text-white flex-shrink-0 bg-zinc-900">
                    {post.authorName.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-sm font-bold text-zinc-900">{post.authorName}</p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-zinc-200" />
                <time dateTime={post.publishedAt} className="text-sm font-light text-zinc-500">
                  {formatDate(post.publishedAt)}
                </time>
                <div className="hidden sm:block w-px h-8 bg-zinc-200" />
                <div className="flex items-center gap-1.5 text-sm font-light text-zinc-500">
                  <Clock className="size-4" />
                  {post.readingTimeMinutes} min de leitura
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-12 border border-zinc-200 shadow-sm">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 280px - 6rem)"
                />
              </div>

              <HtmlArticleRenderer html={post.body} />

              <ShareBar post={{ slug: post.slug, title: post.title, description: post.description }} />

              <div className="mt-12 p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20 shadow-sm">
                <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2">
                  Quer implementar isso no seu negócio?
                </h3>
                <p className="text-zinc-600 font-light mb-6">
                  Converse com nossa equipe de especialistas e descubra como
                  aplicar essas estratégias na realidade da sua empresa.
                </p>
                <a
                  href={whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
                >
                  Falar com Especialista
                </a>
              </div>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents html={post.body} />
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-zinc-200 bg-zinc-50/50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-8">
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchCmsPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await fetchCmsRelatedPosts(post.categorySlug, slug);

  return <CmsPostArticle post={post} related={relatedPosts} />;
}
