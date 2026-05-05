import { cn } from "@/src/lib/utils";
import {
  type ArticleSection,
  type BlogCategory,
  CATEGORY_COLORS,
  slugifyHeading,
} from "../../../../lib/blog";

const CALLOUT_STYLES = {
  info: {
    wrapper: "border-[#00D26A]/40 bg-[#00D26A]/[0.03]",
    title: "text-[#00b35a]",
    body: "text-zinc-700",
    dot: "bg-[#00D26A]",
  },
  warning: {
    wrapper: "border-amber-400 bg-amber-50",
    title: "text-amber-800",
    body: "text-amber-700",
    dot: "bg-amber-400",
  },
  success: {
    wrapper: "border-[#00D26A]/60 bg-[#00D26A]/[0.05]",
    title: "text-[#007a33]", // Verde mais fechado para sucesso
    body: "text-zinc-700",
    dot: "bg-[#00D26A]",
  },
};

interface ArticleRendererProps {
  sections: ArticleSection[];
  category: BlogCategory;
}

export function ArticleRenderer({ sections, category }: ArticleRendererProps) {
  const colors = CATEGORY_COLORS[category];

  return (
    <div className="prose-zinc max-w-none">
      {sections.map((section, i) => {
        switch (section.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-zinc-700 font-light text-lg leading-relaxed mb-6"
              >
                {section.content}
              </p>
            );

          case "heading2":
            return (
              <h2
                key={i}
                id={slugifyHeading(section.content)}
                className="text-2xl font-extrabold text-zinc-900 mt-12 mb-4 scroll-mt-28 tracking-tight"
              >
                {section.content}
              </h2>
            );

          case "heading3":
            return (
              <h3
                key={i}
                id={slugifyHeading(section.content)}
                className="text-xl font-bold text-zinc-800 mt-8 mb-3 scroll-mt-28 tracking-tight"
              >
                {section.content}
              </h3>
            );

          case "list":
            return (
              <ul key={i} className="space-y-3 mb-6 list-none pl-0">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-zinc-700 font-light text-lg leading-relaxed">
                    <span
                      className={cn(
                        "mt-2.5 w-2 h-2 rounded-sm flex-shrink-0", // rounded-sm para um "bullet" mais quadrado e tech
                        colors.dot
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={i} className="space-y-3 mb-6 list-none pl-0 counter-reset-[item]">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-zinc-700 font-light text-lg leading-relaxed">
                    {/* Numeração com a cor e formato corporativo Mavellium */}
                    <span className="flex-shrink-0 w-7 h-7 rounded-sm bg-[#00D26A]/10 text-[#00b35a] text-sm font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "callout": {
            const style = CALLOUT_STYLES[section.variant];
            return (
              <div
                key={i}
                className={cn(
                  "border-l-4 px-6 py-5 rounded-r-md mb-6", // rounded-r-md para manter as quinas retas B2B
                  style.wrapper
                )}
              >
                <p className={cn("text-sm font-bold uppercase tracking-widest mb-1", style.title)}>
                  {section.title}
                </p>
                <p className={cn("text-base font-light leading-relaxed", style.body)}>
                  {section.content}
                </p>
              </div>
            );
          }

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-[#00D26A]/50 pl-6 italic text-zinc-600 text-xl leading-relaxed my-8 bg-zinc-50/50 py-4 rounded-r-md"
              >
                <p>{section.content}</p>
                {section.attribution && (
                  <footer className="mt-3 text-sm not-italic font-bold tracking-wider uppercase text-zinc-400">
                    — {section.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "divider":
            return <hr key={i} className="border-zinc-200 my-10" />;

          default:
            return null;
        }
      })}
    </div>
  );
}