"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { getWhatsappUrl } from "../../../lib/constants";

const FAQS = [
  {
    question: "O que é GEO — Generative Engine Optimization?",
    answer:
      "GEO (Generative Engine Optimization) é a prática de estruturar conteúdo digital para que modelos de linguagem de grande escala (LLMs) como ChatGPT, Perplexity e Gemini consigam identificar, extrair e citar esse conteúdo com precisão e autoridade. Diferente do SEO tradicional, o GEO não prioriza palavras-chave para algoritmos de ranking; prioriza clareza semântica, densidade técnica e marcação estruturada para máquinas generativas.",
  },
  {
    question: "Qual é a diferença entre GEO e SEO?",
    answer:
      "SEO é otimizado para algoritmos de indexação como o Google Crawl — foca em palavras-chave, backlinks e autoridade de domínio. GEO é otimizado para modelos de linguagem generativa — foca em formato Answer-First (resposta direta no início de cada seção), HTML semântico limpo, Schema Markup (JSON-LD) e tempo de resposta do servidor abaixo de 100ms. Um site pode ter SEO excelente e GEO fraco se o conteúdo for ambíguo ou o HTML for poluído.",
  },
  {
    question: "Quais são os quatro pilares do GEO?",
    answer:
      "Os quatro pilares do GEO são: (1) HTML Semântico — uso correto de tags como article, section, h1-h3, abbr e dfn para que o LLM compreenda hierarquia e contexto; (2) Schema Markup (JSON-LD) — mapeamento de entidades como Organization, FAQPage, BreadcrumbList e HowTo que permite ao LLM identificar o tipo de conteúdo sem ambiguidade; (3) Formato Answer-First — cada seção começa com a resposta direta à pergunta implícita, eliminando o delay semântico que faz LLMs descartarem conteúdo; (4) Densidade Técnica — conteúdo com profundidade real, números e evidências concretas, que LLMs selecionam preferencialmente para citação.",
  },
  {
    question: "Por que o WordPress falha para GEO?",
    answer:
      "WordPress falha no GEO por quatro razões técnicas estruturais: (1) Bloat de plugins — com 20+ plugins, o TTFB médio ultrapassa 3.2s; LLMs como o Perplexity têm timeout entre 2–5s e fazem fallback para fontes mais rápidas; (2) HTML sujo gerado por editores WYSIWYG — o Gutenberg gera divs aninhadas, estilos inline e atributos desnecessários que degradam a parsabilidade semântica; (3) JavaScript excessivo — themes carregam em média 847kb de JS; conteúdo que só existe após execução de JS client-side pode ser invisível para parsers síncronos; (4) Arquitetura monolítica — impossibilita cache granular por rota ou CDN por componente.",
  },
  {
    question: "O que é um CMS headless e por que é superior para GEO?",
    answer:
      "Um CMS headless separa a camada de conteúdo (backend/API) da camada de apresentação (frontend). Para o GEO isso é decisivo porque: o frontend pode ser construído em Next.js com SSG, entregando HTML completo na primeira resposta em menos de 100ms; o conteúdo é armazenado como dados estruturados puros, sem lógica de apresentação embutida; cada rota pode ter seu próprio Schema Markup (JSON-LD) gerado dinamicamente; e o CDN pode fazer cache de cada página individualmente, garantindo latência global mínima.",
  },
  {
    question: "Como o Janus CMS da Mavellium foi projetado para GEO?",
    answer:
      "O Janus CMS é o sistema de gestão de conteúdo headless desenvolvido pela Mavellium especificamente para a stack Next.js + React. Para GEO, o Janus oferece: estrutura de dados tipada que mapeia diretamente para JSON-LD sem transformação manual; geração automática de Schema Markup por tipo de rota (artigo, FAQ, produto, organização); API com resposta média abaixo de 50ms, compatível com o ISR do Next.js; HTML limpo e semântico gerado no servidor, sem scripts de terceiros ou estilos inline; e controle granular de cabeçalhos HTTP para cache máximo no Vercel Edge Network.",
  },
  {
    question: "Quais Core Web Vitals são relevantes para GEO?",
    answer:
      "Para GEO, os três indicadores mais relevantes são: (1) Time to First Byte (TTFB) — abaixo de 200ms garante que LLMs recebam o conteúdo antes do timeout; a Mavellium alcança menos de 100ms com Next.js SSG + Vercel Edge; (2) Largest Contentful Paint (LCP) — abaixo de 1.2s indica que o conteúdo principal está disponível rapidamente para parsing; (3) Cumulative Layout Shift (CLS) — próximo de zero garante que o HTML final seja idêntico ao HTML inicial, evitando discrepâncias entre o que o LLM lê e o que o usuário vê.",
  },
  {
    question: "Como implementar GEO no meu site hoje?",
    answer:
      "Para implementar GEO imediatamente, siga estas etapas: (1) Auditoria de HTML — remova divs desnecessárias e substitua por tags semânticas como article, section e aside; (2) Implante Schema Markup JSON-LD — comece com Organization, FAQPage e BreadcrumbList nas rotas principais; (3) Adote o formato Answer-First — reescreva cada seção para que o primeiro parágrafo já responda à pergunta principal; (4) Meça o TTFB — use Vercel Analytics ou PageSpeed Insights; se estiver acima de 300ms, migre para SSG ou ISR; (5) Considere migrar para Next.js — o retorno sobre GEO é mensurável em semanas porque LLMs indexam conteúdo continuamente, não apenas durante crawls programados.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-semibold text-base md:text-lg pr-4 group-hover:text-[#00D26A] transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#00D26A]" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GeoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappUrl = getWhatsappUrl(
    "Olá! Quero implementar GEO no meu site com Next.js e Janus CMS."
  );

  return (
    <section className="px-6 py-20 md:py-28 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              Perguntas frequentes
              <br />
              sobre <span className="text-[#00D26A]">GEO</span>
            </h2>
            <p className="text-zinc-500 mt-3 text-sm font-light">
              Conteúdo espelhado no Schema Markup JSON-LD desta página para ingestão por LLMs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#00D26A]/5 border border-[#00D26A]/20 text-xs font-bold uppercase tracking-widest text-[#00D26A] shrink-0"
          >
            FAQ
          </motion.div>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* CTA final */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-zinc-400 font-light mb-6 text-lg">
            Quer implementar GEO no seu site?
          </p>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#00D26A] hover:bg-[#00b35a] text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-md transition-all duration-300 shadow-[0_0_25px_rgba(0,210,106,0.25)] hover:shadow-[0_0_40px_rgba(0,210,106,0.4)]"
          >
            Falar com Especialista GEO
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
