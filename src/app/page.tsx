
import { Header } from "../components/Header";
import { HeroSection } from "../components/ui/hero-section-with-smooth-bg-shader";
import type { IconName } from "../components/ui/radial-orbital-timeline";
import { Gallery4 } from "../components/ui/gallery4";
import { Footer } from "../components/ui/footer";
import ProjectShowcase from "../components/ui/project-showcase";
import FinalCtaSection from "../components/ui/cta-final";
import HoverPreview from "../components/ui/hover-preview";
import Pricing from "../components/ui/pricing-section";
import { Carousel } from "../components/ui/carousel-companys";
import SelectCards from "../components/ui/select-cards";
import VerticalTabs from "../components/ui/vertical-tabs";
import Benefits from "../components/ui/benefits";
import Demo from "../components/ui/imagem";
import FlippingCardDemo from "../components/ui/autonomous-agents";
import { GalleryGridBlock } from "../components/ui/sections-gallery";
import { Plan, PricingSection } from "../components/ui/pricing-details";

export default function Home() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop', alt: 'Modern architecture' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
    { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop', alt: 'Cityscape' },
  ];

  const blogData = {
    title: "Mavellium Insights",
    description: "Artigos, tendências e análises profundas sobre como a tecnologia e o design impactam o faturamento da sua empresa.",
    items: [
      {
        id: "ia-atendimento",
        title: "A Revolução Silenciosa da IA no Atendimento B2B",
        description:
          "Como agentes autônomos estão substituindo o 'atendimento em horário comercial' e garantindo que empresas fechem negócios às 3 da manhã sem perder a humanização.",
        href: "#",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "design-conversao",
        title: "Por que seu site bonito não converte em vendas?",
        description:
          "Estética sem estratégia é apenas arte. Descubra como a arquitetura da informação e a remoção de distrações em Landing Pages aumentam a captura de leads em até 300%.",
        href: "#",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "seo-tecnico",
        title: "Autoridade Digital não se constrói apenas com redes sociais",
        description:
          "O verdadeiro poder de um Site Institucional Estruturado: como o SEO Técnico e um código limpo garantem que sua empresa seja a primeira resposta no Google.",
        href: "#",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "escalabilidade",
        title: "Sua infraestrutura suporta o seu crescimento?",
        description:
          "Os perigos de basear uma grande operação em templates engessados e plataformas lentas. Por que empresas maduras exigem código desenhado cirurgicamente.",
        href: "#",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "reducao-custos",
        title: "Automação Operacional vs. Folha de Pagamento",
        description:
          "O cálculo definitivo: como a implementação de integrações via API e bots contábeis reduz erros humanos a zero e libera sua equipe para o trabalho criativo.",
        href: "#",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1080",
      },
    ],
  };

  // Import IconName type from the timeline component


  const timelineData = [
    {
      id: 1,
      title: "Planning",
      date: "Jan 2024",
      content: "Project planning and requirements gathering phase.",
      category: "Planning",
      icon: "Calendar" as IconName, // Cast to IconName
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "Design",
      date: "Feb 2024",
      content: "UI/UX design and system architecture.",
      category: "Design",
      icon: "FileText" as IconName,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 90,
    },
    {
      id: 3,
      title: "Development",
      date: "Mar 2024",
      content: "Core features implementation and testing.",
      category: "Development",
      icon: "Code" as IconName,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 60,
    },
    {
      id: 4,
      title: "Testing",
      date: "Apr 2024",
      content: "User testing and bug fixes.",
      category: "Testing",
      icon: "User" as IconName,
      relatedIds: [3, 5],
      status: "pending" as const,
      energy: 30,
    },
    {
      id: 5,
      title: "Release",
      date: "May 2024",
      content: "Final deployment and release.",
      category: "Release",
      icon: "Clock" as IconName,
      relatedIds: [4],
      status: "pending" as const,
      energy: 10,
    },
  ];

const finalCtaData = {
    text: {
      headline: "Pronto para escalar",
      highlight: "o seu negócio?",
      description: "Sabemos que cada empresa é única. Fale com a nossa equipe de especialistas para entendermos o seu momento e desenharmos a arquitetura tecnológica perfeita para a sua operação."
    },
    theme: {
      bg_color: "#ffffff", // Mantém o fundo branco, combinando com a Galeria
      gradient_start: "#3b82f6", // Azul vibrante (Tech)
      gradient_end: "#1e40af",   // Azul escuro profundo
      button_bg: "#050505"       // Botão preto
    },
    calls_to_action: {
      primary: {
        label: "Falar com Especialista",
        href: "https://wa.me/5514999999999", // Coloque seu WhatsApp
        icon: "mdi:whatsapp" // Ícone do WhatsApp fica muito melhor para conversão
      },
      secondary: {
        label: "Rever Nossa Metodologia",
        href: "#metodologia", // Volta para a seção de metodologia se o cliente ainda tiver dúvidas
        icon: "mdi:arrow-up"
      }
    }
  };

  const SlideWithText = ({ image, title, description }: { image: string; title: string; description: string }) => (
    <div className="relative h-156 w-full overflow-hidden rounded-[40px] group">
      <img
        src={image}
        alt={title}
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-12">
        <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  );

  const slidesProjetos = [
    <SlideWithText
      key="1"
      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
      title="Portal Institucional"
      description="Site Inteligente desenhado para transmitir credibilidade e comunicar o portfólio global da marca."
    />,
    <SlideWithText
      key="2"
      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
      title="Captura B2B de Alta Conversão"
      description="Landing Page estratégica, livre de distrações, que maximizou o retorno sobre o investimento em anúncios."
    />,
    <SlideWithText
      key="3"
      image="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200"
      title="Automação de Atendimento (IA)"
      description="Agente autônomo operando 24/7 no setor comercial: qualificação de leads instantânea com redução na folha de custos."
    />,
    <SlideWithText
      key="4"
      image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200"
      title="Plataforma Customizada"
      description="Do planejamento estratégico ao código final: um projeto cirúrgico para a realidade de uma grande operação."
    />,
  ];

  const PLANS: Plan[] = [
  {
    name: 'Landing Pages',
    info: 'Alta conversão para campanhas específicas e infoprodutos.',
    price: {
      mensal: '1.497', // Exemplo de valor fictício
      anual: 'Sob Medida',
    },
    features: [
      { text: 'Design livre de distrações' },
      { text: 'Copywriting Estratégico', tooltip: 'Textos focados em conversão e gatilhos mentais.' },
      { text: 'Integração com CRM/Email' },
      { text: 'Otimização de Velocidade' },
      { text: 'Suporte pós-lançamento' },
    ],
    btn: {
      text: 'Orçar Landing Page',
      href: 'https://wa.me/5514999999999',
    },
  },
  {
    highlighted: true,
    name: 'Site Inteligente',
    info: 'A sede digital oficial da sua empresa com autoridade máxima.',
    price: {
      mensal: '3.990',
      anual: 'Sob Medida',
    },
    features: [
      { text: 'Design Exclusivo e Responsivo' },
      { text: 'Painel de Gestão de Conteúdo (CMS)' },
      { text: 'SEO Técnico Otimizado', tooltip: 'Estrutura pronta para rankear no Google.' },
      { text: 'Animações Premium (Framer Motion)' },
      { text: 'Arquitetura Escalável' },
      { text: 'Reuniões de Alinhamento' },
    ],
    btn: {
      text: 'Construir Autoridade',
      href: 'https://wa.me/5514999999999',
    },
  },
  {
    name: 'Automação & IA',
    info: 'Agentes autônomos para escalar suas operações 24/7.',
    price: {
      mensal: 'Sob Medida',
      anual: 'Sob Medida',
    },
    features: [
      { text: 'Agente Comercial 24/7' },
      { text: 'Integração via WhatsApp/Site' },
      { text: 'Qualificação de Leads com IA' },
      { text: 'Processamento de Dados Contábeis' },
      { text: 'Redução de Custos Operacionais', tooltip: 'Automatiza tarefas que consumiriam horas da sua equipe.' },
      { text: 'Manutenção Evolutiva' },
    ],
    btn: {
      text: 'Consultoria de IA',
      href: 'https://wa.me/5514999999999',
    },
  },
];

  return (
    <>
      <Header
        logo={"/logo-mavellium-header.svg"}
        logoAlt={"Mavellium"}
        links={[{ name: "Início", href: "/" }]}
        ctaLink={""}
        ctaText={"Entre em contato"} />
      <HeroSection />
      <Pricing />
      <Carousel
        slides={slidesProjetos}
        options={{ loop: true }}
        title="Projetos Customizados"
        description="Veja como aplicamos inovações tecnológicas para transformar visitantes em clientes e otimizar operações na prática."
      />
      <SelectCards />
      <VerticalTabs />
      <Benefits />
      <Demo />
      <FlippingCardDemo
        title="Soluções Inteligentes"
        description="Combinamos design centrado no usuário com análise de dados poderosa para impulsionar seu sucesso digital." 
      />
      <GalleryGridBlock />
      <PricingSection
        plans={PLANS}
        heading="Investimento na sua Escala"
        description="Sem custos ocultos. Tecnologias de ponta aplicadas à realidade do seu negócio, seja em projetos fechados ou manutenção evolutiva."
      />
      <FinalCtaSection data={finalCtaData} />
      <HoverPreview />
      <ProjectShowcase />
      <Gallery4  {...blogData}
        cta={{
          label: "Acessar Todos os Artigos",
          href: "/blog",
        }} 
      />
      {/* <ZoomParallax
        title="Meu Título Dinâmico"
        titleClassName="text-4xl md:text-7xl font-black text-white drop-shadow-lg"
        images={images} /> */}
      {/* <RadialOrbitalTimeline
        title="Minha Timeline Interativa"
        description="Uma jornada visual através dos principais marcos do projeto, com conexões dinâmicas e energia pulsante"
        timelineData={timelineData} /> */}
      <Footer />
    </>
  );
}
