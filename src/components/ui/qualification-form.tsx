"use client";

// Reposicionamento GEO/AEO (doc/reposicionamento.md item 3.4) — formulário de
// qualificação, substitui WhatsApp como CTA primário de conversão. Sem libs
// de validação novas (useState + fetch, decisão confirmada) — submit direto
// pro HubSpot Forms Submission API (src/lib/hubspot-form.ts), sem passar por
// uma API route própria.
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  submitQualificationForm,
  SETOR_OPTIONS,
  JA_APARECEU_OPTIONS,
  FATURAMENTO_OPTIONS,
  PROBLEMA_OPTIONS,
  URGENCIA_OPTIONS,
} from "@/src/lib/hubspot-form";

const inputClass =
  "w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#00D26A] focus:ring-2 focus:ring-[#00D26A]/20 transition-all";
const labelClass =
  "mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-600";

// Section wrapper — entra logo abaixo do CtaFinalJanus (que já carrega o
// headline vindo do Janus), fora do controle do CMS para nunca desaparecer
// se o bloco CMS falhar.
export function QualificationFormSection() {
  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-heading"
      className="w-full bg-white py-20 px-6 border-t border-zinc-100"
    >
      <h2 id="diagnostico-heading" className="sr-only">
        Solicitar Raio-X de citabilidade em IA
      </h2>
      <QualificationForm />
    </section>
  );
}

export function QualificationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // honeypot anti-spam — campo invisível para humanos, bots costumam preencher
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (website) return; // honeypot acionado, ignora silenciosamente

    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullname") ?? "").trim();
    const [firstname, ...rest] = fullName.split(" ");

    setSubmitting(true);
    setError(null);
    try {
      await submitQualificationForm(
        {
          firstname: firstname ?? fullName,
          lastname: rest.join(" "),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? "") || undefined,
          company: String(data.get("company") ?? ""),
          cargo: String(data.get("cargo") ?? "") || undefined,
          setor: String(data.get("setor") ?? ""),
          ja_apareceu_ia: String(data.get("ja_apareceu_ia") ?? ""),
          faturamento_mensal: String(data.get("faturamento_mensal") ?? "") || undefined,
          principal_problema: String(data.get("principal_problema") ?? ""),
          urgencia: String(data.get("urgencia") ?? ""),
        },
        window.location.href
      );
      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        "Não conseguimos enviar seu formulário agora. Tente novamente em instantes ou fale pelo WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <CheckCircle2 className="mx-auto mb-4 size-10 text-[#00D26A]" />
        <h3 className="text-xl font-extrabold tracking-tight text-zinc-900 mb-2">
          Recebemos seu pedido de Raio-X
        </h3>
        <p className="text-sm text-zinc-600 font-light leading-relaxed">
          Nossa equipe entra em contato para agendar o diagnóstico de
          citabilidade da sua marca em IA.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto flex flex-col gap-4"
      noValidate
    >
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className={labelClass} htmlFor="qf-fullname">Nome completo *</label>
        <input id="qf-fullname" name="fullname" type="text" required className={inputClass} placeholder="Seu nome" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="qf-email">E-mail *</label>
          <input id="qf-email" name="email" type="email" required className={inputClass} placeholder="voce@empresa.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="qf-phone">WhatsApp</label>
          <input id="qf-phone" name="phone" type="tel" className={inputClass} placeholder="(00) 00000-0000" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="qf-company">Empresa *</label>
          <input id="qf-company" name="company" type="text" required className={inputClass} placeholder="Nome da empresa" />
        </div>
        <div>
          <label className={labelClass} htmlFor="qf-cargo">Cargo</label>
          <input id="qf-cargo" name="cargo" type="text" className={inputClass} placeholder="Seu cargo" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="qf-setor">Setor *</label>
        <select id="qf-setor" name="setor" required className={inputClass} defaultValue="">
          <option value="" disabled>Selecione o setor</option>
          {SETOR_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="qf-ja-apareceu">
          A empresa já apareceu no ChatGPT/Gemini pra própria categoria? *
        </label>
        <select id="qf-ja-apareceu" name="ja_apareceu_ia" required className={inputClass} defaultValue="">
          <option value="" disabled>Selecione</option>
          {JA_APARECEU_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="qf-faturamento">Faturamento médio mensal</label>
        <select id="qf-faturamento" name="faturamento_mensal" className={inputClass} defaultValue="">
          <option value="">Prefiro não informar</option>
          {FATURAMENTO_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="qf-problema">Principal problema *</label>
        <select id="qf-problema" name="principal_problema" required className={inputClass} defaultValue="">
          <option value="" disabled>Selecione</option>
          {PROBLEMA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="qf-urgencia">Urgência *</label>
        <select id="qf-urgencia" name="urgencia" required className={inputClass} defaultValue="">
          <option value="" disabled>Selecione</option>
          {URGENCIA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#00D26A] px-6 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(0,210,106,0.2)] transition-all hover:bg-[#00b35a] hover:shadow-[0_0_25px_rgba(0,210,106,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <><Loader2 className="size-4 animate-spin" /> Enviando...</>
        ) : (
          "Quero receber meu Raio-X"
        )}
      </button>
    </form>
  );
}
