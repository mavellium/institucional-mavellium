
import { Header } from "../components/Header";
import { HeroSection } from "../components/ui/hero-section-with-smooth-bg-shader";
import { ZoomParallax } from "../components/ui/zoom-parallax";
import type { IconName } from "../components/ui/radial-orbital-timeline";
import { Gallery4 } from "../components/ui/gallery4";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "../components/ui/radial-orbital-timeline";
import AboutUsSection from "../components/ui/about-us-section";
import { Footer } from "../components/ui/footer";
import ProjectShowcase from "../components/ui/project-showcase";
import FinalCtaSection from "../components/ui/cta-final";
import HoverPreview from "../components/ui/hover-preview";
import Pricing from "../components/ui/pricing-section";
import { Carousel } from "../components/ui/carousel-companys";
import SelectCards from "../components/ui/select-cards";
import VerticalTabs from "../components/ui/vertical-tabs";
import Benefits from "../components/ui/benefits";
import Video from "../components/ui/video";
import Demo from "../components/ui/video";
import FlippingCardDemo from "../components/ui/autonomous-agents";
import { GalleryGridBlock } from "../components/ui/sections-gallery";
import { PricingSection } from "../components/ui/pricing-details";

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
    // ... add up to 7 images
  ];

  const demoData = {
    title: "Projects",
    description: "Discover how leading companies and developers are leveraging modern web technologies...",
    items: [
      {
        id: "shadcn-ui",
        title: "shadcn/ui: Building a Modern Component Library",
        description:
          "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
        href: "https://ui.shadcn.com",
        image:
          "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      {
        id: "tailwind",
        title: "Tailwind CSS: The Utility-First Revolution",
        description:
          "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
        href: "https://tailwindcss.com",
        image:
          "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      {
        id: "astro",
        title: "Astro: The All-in-One Web Framework",
        description:
          "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
        href: "https://astro.build",
        image:
          "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      {
        id: "react",
        title: "React: Pioneering Component-Based UI",
        description:
          "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
        href: "https://react.dev",
        image:
          "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
      },
      {
        id: "nextjs",
        title: "Next.js: The React Framework for Production",
        description:
          "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
        href: "https://nextjs.org",
        image:
          "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
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
      headline: "Ainda na dúvida sobre",
      highlight: "qual plano escolher?",
      description: "Não se preocupe! Cada projeto é único e nós sabemos disso. Fale com a nossa equipe para entendermos o seu momento e recomendarmos a solução perfeita para o seu negócio."
    },
    theme: {
      bg_color: "#ffffff", // Mantido o seu fundo
      gold_start: "#89c1f7", // Mantido o seu gradiente azul
      gold_end: "#8361f4",   // Mantido o seu gradiente roxo
      button_bg: "#000000"   // Mantido o botão preto
    },
    calls_to_action: {
      primary: {
        label: "Falar com especialista",
        href: "https://wa.me/5511999999999", // Recomendo colocar o link direto pro seu WhatsApp
        icon: "mdi:arrow-right" // Troquei para o ícone do WhatsApp, mas pode voltar pro "mdi:arrow-right" se preferir
      },
      secondary: {
        label: "Ver perguntas frequentes",
        href: "#faq", // Ou "/faq" dependendo das suas rotas
        icon: "mdi:chevron-right"
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

  const slides = [
    <SlideWithText
      key="1"
      image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
      title="Modern Office"
      description="A bright and inspiring workspace"
    />,
    <SlideWithText
      key="2"
      image="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
      title="Team Collaboration"
      description="Working together to achieve great things"
    />,
    <SlideWithText
      key="3"
      image="https://images.unsplash.com/photo-1557804506-669a67965ba0"
      title="Creative Solutions"
      description="Innovative ideas for modern challenges"
    />,
    <SlideWithText
      key="4"
      image="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
      title="Project Management"
      description="Streamlined workflows for success"
    />,
  ];
  const PLANS = [
	{
		id: 'basic',
		name: 'Basic',
		info: 'For most individuals',
		price: {
			monthly: 7,
			yearly: Math.round(7 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Up to 3 Blog posts', limit: '100 tags' },
			{ text: 'Up to 3 Transcriptions' },
			{ text: 'Up to 3 Posts stored' },
			{
				text: 'Markdown support',
				tooltip: 'Export content in Markdown format',
			},
			{
				text: 'Community support',
				tooltip: 'Get answers your questions on discord',
			},
			{
				text: 'AI powered suggestions',
				tooltip: 'Get up to 100 AI powered suggestions',
			},
		],
		btn: {
			text: 'Start Your Free Trial',
			href: '#',
		},
	},
	{
		highlighted: true,
		id: 'pro',
		name: 'Pro',
		info: 'For small businesses',
		price: {
			monthly: 17.99,
			yearly: Math.round(17.99 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Up to 500 Blog Posts', limit: '500 tags' },
			{ text: 'Up to 500 Transcriptions' },
			{ text: 'Up to 500 Posts stored' },
			{
				text: 'Unlimited Markdown support',
				tooltip: 'Export content in Markdown format',
			},
			{ text: 'SEO optimization tools' },
			{ text: 'Priority support', tooltip: 'Get 24/7 chat support' },
			{
				text: 'AI powered suggestions',
				tooltip: 'Get up to 500 AI powered suggestions',
			},
		],
		btn: {
			text: 'Get started',
			href: '#',
		},
	},
	{
		name: 'Business',
		info: 'For large organizations',
		price: {
			monthly: 69.99,
			yearly: Math.round(49.99 * 12 * (1 - 0.12)),
		},
		features: [
			{ text: 'Unlimited Blog Posts' },
			{ text: 'Unlimited Transcriptions' },
			{ text: 'Unlimited Posts stored' },
			{ text: 'Unlimited Markdown support' },
			{
				text: 'SEO optimization tools',
				tooltip: 'Advanced SEO optimization tools',
			},
			{ text: 'Priority support', tooltip: 'Get 24/7 chat support' },
			{
				text: 'AI powered suggestions',
				tooltip: 'Get up to 500 AI powered suggestions',
			},
		],
		btn: {
			text: 'Contact team',
			href: '#',
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
        slides={slides}
        options={{ loop: true }}
        title="Featured Projects"
        description="Discover our latest work and success stories."
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
				heading="Plans that Scale with You"
				description="Whether you're just starting out or growing fast, our flexible pricing has you covered — with no hidden costs."
			/>
      <FinalCtaSection data={finalCtaData} />
      <HoverPreview />
      <ProjectShowcase />
      <Gallery4  {...demoData}
        cta={{
          label: "Ver todos os cases",
          href: "/cases",
          variant: "default"
        }} />
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
