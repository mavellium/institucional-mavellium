
import { Header } from "../components/Header";
import { HeroSection } from "../components/ui/hero-section-with-smooth-bg-shader";
import { ZoomParallax } from "../components/ui/zoom-parallax";
import type { IconName } from "../components/ui/radial-orbital-timeline";
import { Gallery4 } from "../components/ui/gallery4";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline from "../components/ui/radial-orbital-timeline";
import AboutUsSection from "../components/ui/about-us-section";
import { Footer } from "../components/ui/footer";
import { ProjectShowcase } from "../components/ui/project-showcase";

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
  return (
    <>
      <Header
        logo={"/logo-mavellium-header.svg"}
        logoAlt={"Mavellium"}
        links={[{ name: "Início", href: "/" }]}
        ctaLink={""}
        ctaText={"Entre em contato"} />
      <HeroSection distortion={1.2} speed={0.8} />
      <AboutUsSection />
      <ProjectShowcase 
        title="Por que a Mavellium?"
        description="Conheça alguns dos nossos trabalhos mais recentes que combinam criatividade e tecnologia."
      />
      <ZoomParallax
        title="Meu Título Dinâmico"
        titleClassName="text-4xl md:text-7xl font-black text-white drop-shadow-lg"
        images={images} />
      <Gallery4 {...demoData} />
      <RadialOrbitalTimeline 
      title="Minha Timeline Interativa"
      description="Uma jornada visual através dos principais marcos do projeto, com conexões dinâmicas e energia pulsante"
      timelineData={timelineData} />
      <Footer />
    </>
  );
}
