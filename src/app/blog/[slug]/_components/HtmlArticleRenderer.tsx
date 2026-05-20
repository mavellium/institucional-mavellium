interface HtmlArticleRendererProps {
  html: string;
}

export function HtmlArticleRenderer({ html }: HtmlArticleRendererProps) {
  return (
    <div
      className="
        prose prose-zinc max-w-none
        prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-zinc-900
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-28
        prose-h3:text-xl prose-h3:font-bold prose-h3:text-zinc-800 prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-28
        prose-p:text-zinc-700 prose-p:font-light prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
        prose-ol:pl-6 prose-ol:space-y-2
        prose-li:text-zinc-700 prose-li:font-light prose-li:text-lg
        prose-blockquote:border-l-4 prose-blockquote:border-[#00D26A]/50 prose-blockquote:pl-6
        prose-blockquote:italic prose-blockquote:text-zinc-600 prose-blockquote:text-xl prose-blockquote:leading-relaxed
        prose-blockquote:my-8 prose-blockquote:bg-zinc-50/50 prose-blockquote:py-4 prose-blockquote:rounded-r-md
        prose-strong:font-bold prose-strong:text-zinc-900
        prose-a:text-[#00b35a] prose-a:font-medium hover:prose-a:text-[#00D26A]
        prose-hr:border-zinc-200 prose-hr:my-10
        prose-img:rounded-md prose-img:border prose-img:border-zinc-200
        prose-code:text-[#00b35a] prose-code:bg-zinc-100 prose-code:px-1 prose-code:rounded
        prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:rounded-md
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
