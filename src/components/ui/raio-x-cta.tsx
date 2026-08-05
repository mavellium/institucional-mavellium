"use client";

// doc/conversao.md seção 4 — CTA reutilizável para a seção do Raio-X
// (âncora /#diagnostico na home). Copy é placeholder proposital — texto
// definitivo é tarefa separada (regra "nenhuma métrica/promessa inventada").
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/src/lib/analytics";

const RAIO_X_HREF = "/#diagnostico";
const BUTTON_TEXT = "TODO_COPY: texto do botão";
const DEFAULT_TITULO = "TODO_COPY: título do CTA Raio-X";
const DEFAULT_TEXTO = "TODO_COPY: texto de apoio do CTA Raio-X";

interface RaioXCTAProps {
  variant: "inline" | "destaque";
  location: string;
  titulo?: string;
  texto?: string;
}

export function RaioXCTA({ variant, location, titulo, texto }: RaioXCTAProps) {
  const heading = titulo ?? DEFAULT_TITULO;
  const body = texto ?? DEFAULT_TEXTO;

  function handleClick() {
    trackCtaClick(RAIO_X_HREF, BUTTON_TEXT, location);
  }

  if (variant === "inline") {
    return (
      <div className="not-prose my-10 flex flex-col gap-4 rounded-md border border-[#00D26A]/20 bg-[#00D26A]/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-zinc-900">{heading}</p>
          <p className="text-sm font-light text-zinc-600">{body}</p>
        </div>
        <Link
          href={RAIO_X_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#00D26A] px-5 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-[#00b35a]"
        >
          {BUTTON_TEXT}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="my-12 rounded-md border border-[#00D26A]/20 bg-gradient-to-br from-[#00D26A]/[0.06] to-zinc-50 p-8 text-center sm:p-10">
      <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">{heading}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm font-light text-zinc-600 sm:text-base">{body}</p>
      <Link
        href={RAIO_X_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#00D26A] px-6 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,210,106,0.2)] transition-all hover:bg-[#00b35a] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
      >
        {BUTTON_TEXT}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
