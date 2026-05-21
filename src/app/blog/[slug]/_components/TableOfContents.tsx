"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import { type ArticleSection, slugifyHeading } from "../../../../lib/blog";

interface Heading {
  id: string;
  content: string;
  level: 2 | 3;
}

function extractHeadingsFromSections(sections: ArticleSection[]): Heading[] {
  const result: Heading[] = [];
  for (const s of sections) {
    if (s.type === "heading2") {
      result.push({ id: slugifyHeading(s.content), content: s.content, level: 2 });
    } else if (s.type === "heading3") {
      result.push({ id: slugifyHeading(s.content), content: s.content, level: 3 });
    }
  }
  return result;
}

function extractHeadingsFromHtml(html: string): Heading[] {
  const result: Heading[] = [];
  const re = /<(h[23])[^>]*(?:id="([^"]*)")?[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const level = (match[1] === "h2" ? 2 : 3) as 2 | 3;
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    const id = match[2] || slugifyHeading(text);
    if (text) result.push({ id, content: text, level });
  }
  return result;
}

interface TableOfContentsProps {
  sections?: ArticleSection[];
  html?: string;
}

export function TableOfContents({ sections, html }: TableOfContentsProps) {
  const headings = html
    ? extractHeadingsFromHtml(html)
    : extractHeadingsFromSections(sections ?? []);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-112px 0px -60% 0px",
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28">
      <div className="rounded-md border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50/70">
          <p className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400">
            Neste artigo
          </p>
        </div>
        <nav aria-label="Índice do artigo" className="px-3 py-3 space-y-0.5">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(
                "flex items-start gap-2.5 rounded-sm py-1.5 px-2 text-sm leading-snug transition-all duration-200 border-l-2",
                h.level === 3 ? "ml-3 text-[13px]" : "",
                activeId === h.id
                  ? "border-[#00D26A] text-[#00b35a] font-semibold bg-[#00D26A]/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300"
              )}
            >
              {h.content}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}