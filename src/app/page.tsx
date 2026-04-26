
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
import { getWhatsappUrl, siteConfig } from "../lib/constants";

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
        href: "/blog/ia-atendimento-b2b",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "design-conversao",
        title: "Por que seu site bonito não converte em vendas?",
        description:
          "Estética sem estratégia é apenas arte. Descubra como a arquitetura da informação e a remoção de distrações em Landing Pages aumentam a captura de leads em até 300%.",
        href: "/blog/design-conversao",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "seo-tecnico",
        title: "Autoridade Digital não se constrói apenas com redes sociais",
        description:
          "O verdadeiro poder de um Site Institucional Estruturado: como o SEO Técnico e um código limpo garantem que sua empresa seja a primeira resposta no Google.",
        href: "/blog/seo-autoridade-digital",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "escalabilidade",
        title: "Sua infraestrutura suporta o seu crescimento?",
        description:
          "Os perigos de basear uma grande operação em templates engessados e plataformas lentas. Por que empresas maduras exigem código desenhado cirurgicamente.",
        href: "/blog/escalabilidade-infraestrutura",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080",
      },
      {
        id: "reducao-custos",
        title: "Automação Operacional vs. Folha de Pagamento",
        description:
          "O cálculo definitivo: como a implementação de integrações via API e bots contábeis reduz erros humanos a zero e libera sua equipe para o trabalho criativo.",
        href: "/blog/reducao-custos-automacao",
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

        href: getWhatsappUrl("Olá! Estava navegando no site da Mavellium e gostaria de agendar uma conversa com um especialista para escalar meu negócio."),
        icon: "mdi:whatsapp" 
      },
      secondary: {
        label: "Rever Nossa Metodologia",
        href: "#metodologia", // Volta para a seção de metodologia se o cliente ainda tiver dúvidas
        icon: "mdi:arrow-up"
      }
    }
  };

  const SlideWithText = ({ image, title, description }: { image: string; title: string; description: string }) => (
    <div className="relative h-[400px] md:h-[480px] w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] group border border-black/5 shadow-lg">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradiente ampliado para garantir que o texto branco sempre tenha contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
      
      {/* Espaçamento interno (padding) muito maior: p-8 no mobile e p-12 no desktop */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-8 md:p-12 h-full">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-white/80 text-base md:text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const slidesMetodologia = [
    <SlideWithText
      key="1"
      image="/imagem-1.png"
      title="1. Imersão e Briefing"
      description="Sentamos com você para entender a fundo a sua dor, o seu modelo de negócio e o que você espera de resultado."
    />,
    <SlideWithText
      key="2"
      image="/imagem-2.png"
      title="2. Análise de Viabilidade"
      description="Nossa equipe técnica seleciona as melhores tecnologias atuais para resolver a sua demanda com o melhor custo-benefício."
    />,
    <SlideWithText
      key="3"
      image="/imagem-3.png"
      title="3. Cronograma de Entregas"
      description="O projeto é fatiado em etapas. Criamos um calendário transparente para que você acompanhe visualmente o progresso."
    />,
    <SlideWithText
      key="4"
      image="/imagem-4.png"
      title="4. Desenvolvimento"
      description="Você tem visão total do andamento do projeto, validando e acompanhando cada fase concluída pela nossa equipe."
    />,
    <SlideWithText
      key="5"
      image="/imagem-5.png"
      title="5. Entrega Final"
      description="O projeto só é finalizado quando atinge os nossos rigorosos padrões de excelência e a sua total satisfação."
    />,
  ];

  const PLANS: Plan[] = [
    {
      name: 'Landing Pages',
      info: 'Páginas desenvolvidas com um único objetivo: transformar visitantes em clientes reais.',
      label: 'Alta Conversão',
      features: [
        { text: 'Design livre de distrações' },
        { text: 'Copywriting Estratégico', tooltip: 'Textos focados em conversão e gatilhos mentais.' },
        { text: 'Integração com CRM/Email' },
        { text: 'Otimização de Velocidade' },
        { text: 'Maximização de anúncios' },
      ],
      btn: {
        text: 'Acelerar Vendas',
        // Mensagem focada em Landing Pages e conversão
        href: getWhatsappUrl("Olá! Gostaria de saber mais sobre o desenvolvimento de uma Landing Page de Alta Conversão para escalar minhas vendas."),
      },
    },
    {
      highlighted: true,
      name: 'Site Inteligente',
      info: 'A sede digital oficial da sua empresa, estruturada para transmitir credibilidade 24h por dia.',
      label: 'Autoridade Digital',
      features: [
        { text: 'Design Exclusivo e Responsivo' },
        { text: 'Painel de Gestão de Conteúdo (CMS)' },
        { text: 'SEO Técnico Otimizado', tooltip: 'Estrutura pronta para rankear no Google.' },
        { text: 'Animações Premium' },
        { text: 'Arquitetura Escalável' },
        { text: 'Posicionamento global da marca' },
      ],
      btn: {
        text: 'Construir Autoridade',
        // Mensagem focada em Institucional e posicionamento
        href: getWhatsappUrl("Olá, equipe Mavellium! Quero construir a Autoridade Digital da minha empresa com um Site Inteligente de alto padrão."),
      },
    },
    {
      name: 'Automação & IA',
      info: 'Agentes autônomos impulsionados por Inteligência Artificial para operar seu negócio.',
      label: 'Operação 24/7',
      features: [
        { text: 'Agente Comercial 24/7' },
        { text: 'Integração via WhatsApp/Site' },
        { text: 'Qualificação de Leads com IA' },
        { text: 'Processamento de Dados Contábeis' },
        { text: 'Redução de Custos Operacionais', tooltip: 'Automatiza tarefas que consumiriam horas da sua equipe.' },
        { text: 'Atendimento instantâneo' },
      ],
      btn: {
        text: 'Automatizar Operação',
        // Mensagem focada em eficiência e Inteligência Artificial
        href: getWhatsappUrl("Olá! Vi no site sobre as soluções de Automação e Inteligência Artificial e gostaria de entender como aplicar na minha operação."),
      },
    },
  ];

  return (
    <>
      <Header
        logo={"/logo-mavellium-header.svg"}
        logoAlt={"Mavellium - Tecnologia e Inovação"}
        links={[
          { name: "Início", href: "#inicio" },
          { name: "Quem Somos", href: "#quem-somos" },
          { name: "Soluções", href: "#solucoes" },
          { name: "Blog", href: "/blog" },
          { name: "Metodologia", href: "#metodologia" }
        ]}
        ctaLink={getWhatsappUrl("Olá! Estava navegando no site da Mavellium e gostaria de falar com um especialista.")}
        ctaText={"Falar com Especialista"}
      />
      <HeroSection />
      <Pricing />
      <div id="metodologia">
        <Carousel
          slides={slidesMetodologia}
          options={{ loop: false, align: "start" }}
          title="Nossa Metodologia"
          description="Transparência e previsibilidade. Você nunca fica no escuro: nosso processo de ponta a ponta é dividido em 5 passos claros."
        />
      </div>
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
        heading="Modelos de Projeto"
        description="Desenhados cirurgicamente para a realidade do seu negócio. Do planejamento estratégico ao código final, sem terceirização cega."
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
