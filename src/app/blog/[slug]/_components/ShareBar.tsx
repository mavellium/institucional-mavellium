"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link2, Check } from "lucide-react";
import { Icon } from "@iconify/react";
import { type BlogPost } from "../../../../lib/blog";

interface ShareBarProps {
  post: BlogPost;
}

export function ShareBar({ post }: ShareBarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  
  // Iniciamos com a URL base de produção para o SSR (Server Side Rendering)
  // Isso garante que o HTML inicial seja idêntico no servidor e no cliente
  const [pageUrl, setPageUrl] = useState(`https://mavellium.com.br${pathname}`);

  useEffect(() => {
    // Após o componente montar, atualizamos para a URL real do navegador
    // Isso resolve o problema no localhost e captura mudanças dinâmicas
    setPageUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);

  function handleCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-12 pt-8 border-t border-zinc-100">
      <p className="text-sm font-semibold text-zinc-500 mb-4 uppercase tracking-widest">
        Compartilhar artigo
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          aria-label="Compartilhar no LinkedIn"
        >
          <Icon icon="mdi:linkedin" className="size-4" />
          LinkedIn
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-zinc-800 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-200"
          aria-label="Compartilhar no X (Twitter)"
        >
          <Icon icon="ri:twitter-x-fill" className="size-4" />
          Twitter / X
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(post.title + " — " + pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
          aria-label="Compartilhar no WhatsApp"
        >
          <Icon icon="mdi:whatsapp" className="size-4" />
          WhatsApp
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-200"
          aria-label="Copiar link"
        >
          {copied ? (
            <>
              <Check className="size-4 text-emerald-600" />
              <span className="text-emerald-600">Copiado!</span>
            </>
          ) : (
            <>
              <Link2 className="size-4" />
              Copiar link
            </>
          )}
        </button>
      </div>
    </div>
  );
}