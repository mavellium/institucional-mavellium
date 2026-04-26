"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import { type ArticleSection, slugifyHeading } from "../../../../lib/blog";

interface Heading {
  id: string;
  content: string;
  level: 2 | 3;
}

function extractHeadings(sections: ArticleSection[]): Heading[] {
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

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const headings = extractHeadings(sections);
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
    <nav aria-label="Índice do artigo" className="sticky top-28 space-y-1">
      <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-4">
        Neste artigo
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={cn(
            "block py-1 text-sm transition-all duration-200 border-l-2",
            h.level === 3 ? "pl-7" : "pl-4",
            activeId === h.id
              ? "border-blue-500 text-blue-600 font-semibold"
              : "border-transparent text-zinc-400 hover:text-zinc-700 hover:border-zinc-300"
          )}
        >
          {h.content}
        </a>
      ))}
    </nav>
  );
}
