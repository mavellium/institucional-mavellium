"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, X, CheckCircle2, Loader2 } from "lucide-react";
import type { FitecLead } from "@/src/lib/fitec-api";

interface FitecGridProps {
  leads: FitecLead[];
}

interface PendingDownload {
  imageUrl: string;
  leadName: string;
  id: string;
}

export function FitecGrid({ leads }: FitecGridProps) {
  const INITIAL_COUNT = 8;
  const LOAD_MORE_COUNT = 8;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const visibleLeads = leads.slice(0, visibleCount);
  const hasMore = visibleCount < leads.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + LOAD_MORE_COUNT);

  const handleDownloadClick = (imageUrl: string, leadName: string, id: string) => {
    setPendingDownload({ imageUrl, leadName, id });
    setFormError(null);
    setShowFormModal(true);
  };

  const executeDownload = async (imageUrl: string, leadName: string) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("fetch falhou");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FITEC_2026_${leadName.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.download = `FITEC_2026_${leadName.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingDownload) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/fitec-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFormError(data.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }

      setShowFormModal(false);
      await executeDownload(pendingDownload.imageUrl, pendingDownload.leadName);
      setShowThanksModal(true);
      setName("");
      setEmail("");
      setPhone("");
      setPendingDownload(null);
    } catch {
      setFormError("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-zinc-300 rounded-md">
        <p className="text-zinc-500 font-light">Nenhum dado encontrado no momento.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {visibleLeads.map((lead) => (
            <div
              key={lead.id}
              className="group relative flex flex-col bg-white rounded-md overflow-hidden border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                <Image
                  src={lead.image}
                  alt={lead.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => handleDownloadClick(lead.image, lead.name, lead.id)}
                  className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-[#00D26A] hover:text-black opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  aria-label="Baixar imagem"
                >
                  <Download className="size-5" />
                </button>
              </div>

              <div className="p-4 border-t border-zinc-100">
                <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide line-clamp-1">
                  {lead.name}
                </h3>
                {lead.role && (
                  <p className="text-xs text-zinc-500 mt-1 font-light line-clamp-1">
                    {lead.role}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="mt-16 inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-sm transition-all duration-300 hover:border-[#00D26A] hover:text-[#00D26A] hover:shadow-md"
          >
            Carregar Mais
          </button>
        )}
      </div>

      {/* Modal: formulário de cadastro */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00D26A]/10">
              <Download className="size-6 text-[#00D26A]" />
            </div>

            <h2 className="mb-1 text-center text-xl font-extrabold text-zinc-900 tracking-tight">
              Antes de baixar
            </h2>
            <p className="mb-6 text-center text-sm font-light text-zinc-500">
              Preencha rapidinho para receber sua foto da FITEC 2026.
            </p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#00D26A] focus:ring-2 focus:ring-[#00D26A]/20 transition-all"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#00D26A] focus:ring-2 focus:ring-[#00D26A]/20 transition-all"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#00D26A] focus:ring-2 focus:ring-[#00D26A]/20 transition-all"
                />
              </div>

              {formError && (
                <p className="text-center text-sm text-red-500">{formError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00D26A] px-6 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,210,106,0.2)] transition-all hover:bg-[#00b35a] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 className="size-4 animate-spin" /> Enviando...</>
                ) : (
                  <><Download className="size-4" /> Baixar Foto</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: agradecimento */}
      {showThanksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowThanksModal(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00D26A]/10">
              <CheckCircle2 className="size-8 text-[#00D26A]" />
            </div>

            <h2 className="mb-2 text-2xl font-extrabold text-zinc-900 tracking-tight">
              Download Concluído!
            </h2>
            <p className="mb-8 text-sm font-light text-zinc-600">
              Agradecemos imensamente pela sua visita ao nosso estande na FITEC 2026.
              Foi um prazer conectar com você! Que tal aproveitar para descobrir
              como podemos ajudar o seu negócio a escalar?
            </p>

            <Link
              href="/#solucoes"
              onClick={() => setShowThanksModal(false)}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#00D26A] px-6 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,210,106,0.2)] transition-all hover:bg-[#00b35a] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)]"
            >
              Conheça nossas Soluções
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
