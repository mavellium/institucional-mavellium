import type { BlogCtaConfig } from "@/src/lib/blog-config";

interface BlogCTAProps {
  whatsappUrl: string;
  config: BlogCtaConfig;
}

export function BlogCTA({ whatsappUrl, config }: BlogCTAProps) {
  const href = config.buttonUrl ?? whatsappUrl;

  return (
    <div className="mt-12 p-8 rounded-md bg-gradient-to-br from-[#00D26A]/[0.05] to-zinc-50 border border-[#00D26A]/20 shadow-sm">
      <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2">
        {config.title}
      </h3>
      <p className="text-zinc-600 font-light mb-6">
        {config.description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(0,210,106,0.2)] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
      >
        {config.buttonText}
      </a>
    </div>
  );
}
