"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link2, Check } from "lucide-react";
import { Icon } from "@iconify/react";
import type { BlogShareConfig, SharePlatform } from "@/src/lib/blog-config";

interface ShareBarProps {
  post: { slug: string; title: string; description?: string };
  config: BlogShareConfig;
}

const PLATFORM_META: Record<SharePlatform, { label: string; icon: string; getHref: (url: string, title: string) => string; className: string }> = {
  linkedin: {
    label: "LinkedIn",
    icon: "mdi:linkedin",
    getHref: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    className: "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50",
  },
  twitter: {
    label: "Twitter / X",
    icon: "ri:twitter-x-fill",
    getHref: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    className: "hover:border-zinc-900 hover:text-zinc-900 hover:bg-zinc-50",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: "mdi:whatsapp",
    getHref: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`,
    className: "hover:border-[#00D26A]/50 hover:text-[#00b35a] hover:bg-[#00D26A]/5",
  },
  copy: {
    label: "",
    icon: "",
    getHref: function (url: string, title: string): string {
      throw new Error("Function not implemented.");
    },
    className: ""
  }
};

export function ShareBar({ post, config }: ShareBarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState(`https://mavellium.com.br${pathname}`);

  useEffect(() => {
    setPageUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  function handleCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const baseButtonClass =
    "flex items-center gap-2 px-4 py-2 rounded-md border border-zinc-200 text-sm font-bold text-zinc-600 transition-all duration-200";

  return (
    <div className="mt-12 pt-8 border-t border-zinc-200">
      <p className="text-[10px] font-bold text-zinc-400 mb-4 uppercase tracking-widest">
        {config.label}
      </p>
      <div className="flex flex-wrap gap-3">
        {config.platforms.map((platform) => {
          if (platform === "copy") {
            return (
              <button
                key="copy"
                onClick={handleCopy}
                className={`${baseButtonClass} hover:border-[#00D26A]/50 hover:text-[#00b35a] hover:bg-[#00D26A]/5`}
                aria-label="Copiar link"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-[#00b35a]" />
                    <span className="text-[#00b35a]">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="size-4" />
                    Copiar link
                  </>
                )}
              </button>
            );
          }

          const meta = PLATFORM_META[platform];
          return (
            <a
              key={platform}
              href={meta.getHref(pageUrl, post.title)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseButtonClass} ${meta.className}`}
              aria-label={`Compartilhar no ${meta.label}`}
            >
              <Icon icon={meta.icon} className="size-4" />
              {meta.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
