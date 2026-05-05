import * as React from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

// shadcn/ui bits
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// ---- minimal craft-ds inline (single-file helper) ----------------
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getWhatsappUrl } from "@/src/lib/constants";
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type SectionProps = { children: React.ReactNode; className?: string; id?: string };
type ContainerProps = { children: React.ReactNode; className?: string; id?: string };

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-16 md:py-24", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-6xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);
// ------------------------------------------------------------------

type PlanTier = "Sites Inteligentes" | "Landing Pages" | "Automação (IA)";

interface PricingCardProps {
  title: PlanTier;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

const pricingData: PricingCardProps[] = [
  {
    title: "Sites Inteligentes",
    price: "Autoridade Digital",
    description: "A sede digital da sua empresa estruturada para transmitir credibilidade 24h por dia.",
    features: [
      "Comunicação global da marca",
      "Apresentação de portfólio completo",
      "Posicionamento de valores e histórico",
      "Fidelização do seu público-alvo"
    ],
    cta: "Construir Minha Autoridade",
    href: getWhatsappUrl("Olá! Quero elevar o posicionamento da minha marca com um Site Inteligente focado em Autoridade Digital."), 
  },
  {
    title: "Landing Pages",
    price: "Alta Conversão",
    description: "Páginas de destino criadas com um único objetivo: transformar visitantes em clientes.",
    features: [
      "Design livre de distrações",
      "Captura estratégica de leads",
      "Foco em campanhas de marketing",
      "Maximização do retorno em anúncios"
    ],
    cta: "Acelerar Minhas Vendas",
    featured: true,
    href: getWhatsappUrl("Olá! Gostaria de acelerar minhas vendas com uma Landing Page de Alta Conversão para as minhas campanhas."),
  },
  {
    title: "Automação (IA)",
    price: "Operação 24/7",
    description: "Agentes autônomos impulsionados por Inteligência Artificial para operar seu negócio.",
    features: [
      "Atuação comercial, marketing e contábil",
      "Redução da carga sobre a folha de pagamento",
      "Atendimento instantâneo para centenas de clientes",
      "Qualificação de leads e processamento de dados"
    ],
    cta: "Automatizar Minha Operação",
    href: getWhatsappUrl("Olá! Tenho interesse em implementar Agentes de IA e Automação para otimizar a operação do meu negócio."),
  },
];

export default function Pricing() {
  return (
    <Section id="solucoes" className="bg-[#050505] z-10 border-t border-white/5">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="!my-0 text-4xl md:text-5xl font-medium text-white tracking-tight">
          Soluções <span className="text-[#00D26A]">Estratégicas</span>
        </h2>
        <p className="text-lg opacity-70 md:text-xl text-zinc-300 max-w-2xl mt-2 font-light">
          Projetos desenhados cirurgicamente para a realidade e necessidade de cada cliente, escalando negócios no ambiente digital.
        </p>

        <div className="not-prose mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 w-full">
          {pricingData.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function PricingCard({ plan }: { plan: PricingCardProps }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border p-8 text-left transition-all duration-300 hover:-translate-y-2",
        plan.featured 
          // Card em Destaque: Borda verde, glow verde sutil e fundo levemente esverdeado
          ? "border-[#00D26A]/50 bg-[#00D26A]/[0.03] shadow-[0_0_30px_rgba(0,210,106,0.1)] ring-1 ring-[#00D26A]/50" 
          // Card Normal: Borda sutil branca/cinza
          : "border-white/10 bg-zinc-900/20"
      )}
      aria-label={`Solução: ${plan.title}`}
    >
      <div className="text-left">
        <div className="inline-flex items-center gap-2">
          <Badge 
            variant={plan.featured ? "default" : "secondary"} 
            className={cn(
              "text-sm px-3 py-1 font-medium rounded-sm border-0",
              plan.featured 
                ? "bg-[#00D26A] hover:bg-[#00b35a] text-black" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {plan.title}
          </Badge>
          
          {plan.featured && (
            <span className="rounded-sm bg-[#00D26A]/10 px-3 py-1 text-xs font-medium text-[#00D26A] border border-[#00D26A]/20">
              Mais Solicitado
            </span>
          )}
        </div>
        
        <h4 className="mb-3 mt-8 text-3xl font-medium text-white tracking-tight">{plan.price}</h4>
        <p className="text-base leading-relaxed text-zinc-400 font-light min-h-[4rem]">{plan.description}</p>
      </div>

      <div className={cn("my-8 border-t", plan.featured ? "border-[#00D26A]/20" : "border-white/10")} />

      <ul className="space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start text-sm leading-tight text-zinc-300 font-light">
            <CircleCheck 
              className={cn("mr-3 h-5 w-5 shrink-0", plan.featured ? "text-[#00D26A]" : "text-white/40")} 
              aria-hidden 
            />
            <span className="pt-0.5">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <Link href={plan.href} target="_blank" rel="noreferrer noopener" className="w-full block">
          <Button 
            size="lg" 
            className={cn(
              "w-full cursor-pointer font-bold transition-colors rounded-md h-12 text-base",
              plan.featured 
                ? "bg-[#00D26A] text-black hover:bg-[#00b35a]" 
                : "bg-white text-black hover:bg-zinc-200"
            )}
          >
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}