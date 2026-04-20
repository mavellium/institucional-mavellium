import * as React from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

// shadcn/ui bits
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// ---- minimal craft-ds inline (single-file helper) ----------------
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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

// Dados mapeados diretamente das suas frentes de atuação
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
    href: "https://wa.me/5514999999999", // Link do WhatsApp
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
    href: "https://wa.me/5514999999999",
    featured: true, // Destaque para a solução mais procurada
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
    href: "https://wa.me/5514999999999",
  },
];

export default function Pricing() {
  return (
    // Adicionado o id="solucoes" para linkar com o Header e Hero
    <Section id="solucoes" className="bg-black z-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="!my-0 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Soluções Estratégicas
        </h2>
        <p className="text-lg opacity-80 md:text-xl text-white max-w-2xl mt-2">
          Desenvolvemos projetos desenhados cirurgicamente para a realidade e necessidade de cada cliente, independentemente do porte da sua empresa.
        </p>

        <div className="not-prose mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
        "flex flex-col rounded-2xl border p-8 text-left transition-all duration-300 hover:-translate-y-2",
        plan.featured 
          ? "border-blue-500 bg-blue-950/10 shadow-[0_0_30px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/50" 
          : "border-white/10 bg-zinc-900/30"
      )}
      aria-label={`Solução: ${plan.title}`}
    >
      <div className="text-left">
        <div className="inline-flex items-center gap-2">
          <Badge 
            variant={plan.featured ? "default" : "secondary"} 
            className={cn(
              "text-sm px-3 py-1",
              plan.featured ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {plan.title}
          </Badge>
          {plan.featured && (
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/30">
              Mais Solicitado
            </span>
          )}
        </div>
        <h4 className="mb-3 mt-6 text-3xl font-bold text-white">{plan.price}</h4>
        {plan.description && <p className="text-base leading-relaxed opacity-70 text-white min-h-[4rem]">{plan.description}</p>}
      </div>

      <div className={cn("my-6 border-t", plan.featured ? "border-blue-500/20" : "border-white/10")} />

      <ul className="space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start text-sm leading-tight opacity-80 text-white">
            <CircleCheck className={cn("mr-3 h-5 w-5 shrink-0", plan.featured ? "text-blue-400" : "text-white/50")} aria-hidden />
            <span className="pt-0.5">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link href={plan.href} target="_blank" rel="noreferrer noopener" className="w-full">
          <Button 
            size="lg" 
            className={cn(
              "w-full cursor-pointer font-bold transition-all",
              plan.featured 
                ? "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
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