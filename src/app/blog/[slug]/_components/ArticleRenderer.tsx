import { cn } from "@/src/lib/utils";
import {
  type ArticleSection,
  type BlogCategory,
  CATEGORY_COLORS,
  slugifyHeading,
} from "../../../../lib/blog";

const CALLOUT_STYLES = {
  info: {
    wrapper: "border-blue-400 bg-blue-50",
    title: "text-blue-800",
    body: "text-blue-700",
    dot: "bg-blue-400",
  },
  warning: {
    wrapper: "border-amber-400 bg-amber-50",
    title: "text-amber-800",
    body: "text-amber-700",
    dot: "bg-amber-400",
  },
  success: {
    wrapper: "border-emerald-400 bg-emerald-50",
    title: "text-emerald-800",
    body: "text-emerald-700",
    dot: "bg-emerald-400",
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
                className="text-zinc-700 text-lg leading-relaxed mb-6"
              >
                {section.content}
              </p>
            );

          case "heading2":
            return (
              <h2
                key={i}
                id={slugifyHeading(section.content)}
                className="text-2xl font-bold text-zinc-900 mt-12 mb-4 scroll-mt-28"
              >
                {section.content}
              </h2>
            );

          case "heading3":
            return (
              <h3
                key={i}
                id={slugifyHeading(section.content)}
                className="text-xl font-semibold text-zinc-800 mt-8 mb-3 scroll-mt-28"
              >
                {section.content}
              </h3>
            );

          case "list":
            return (
              <ul key={i} className="space-y-3 mb-6 list-none pl-0">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-zinc-700 text-lg leading-relaxed">
                    <span
                      className={cn(
                        "mt-2 w-2 h-2 rounded-full flex-shrink-0",
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
                  <li key={j} className="flex items-start gap-4 text-zinc-700 text-lg leading-relaxed">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center mt-0.5">
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
                  "border-l-4 px-6 py-5 rounded-r-2xl mb-6",
                  style.wrapper
                )}
              >
                <p className={cn("text-sm font-bold uppercase tracking-wider mb-1", style.title)}>
                  {section.title}
                </p>
                <p className={cn("text-base leading-relaxed", style.body)}>
                  {section.content}
                </p>
              </div>
            );
          }

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-zinc-300 pl-6 italic text-zinc-600 text-xl leading-relaxed my-8"
              >
                <p>{section.content}</p>
                {section.attribution && (
                  <footer className="mt-2 text-sm not-italic font-semibold text-zinc-500">
                    — {section.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "divider":
            return <hr key={i} className="border-zinc-100 my-10" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
