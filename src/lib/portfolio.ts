// src/lib/portfolio.ts

export type PortfolioProject = {
    id: number;
    title: string;
    description: string;
    image: string;
    categoryLabel: string;
    categoryValue: string;
    tag: string;
    cta: string;
    href: string;
};

// 1. FONTE ÚNICA DE DADOS (Cadastre novos projetos apenas aqui)
export const portfolioData: PortfolioProject[] = [
    {
        id: 1,
        title: "Agência de Marketing Tegbe",
        description: "Página de alta conversão estruturada para captação de leads qualificados, com remoção de distrações e foco total em maximizar o retorno sobre anúncios.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        categoryLabel: "Landing Pages",
        categoryValue: "landing-pages",
        tag: "Captação B2B",
        cta: "Analisar Conversão",
        href: "#",
    },
    {
        id: 2,
        title: "Tegpro - Curso Gestão de E-commerce",
        description: "Página de vendas focada na conversão de alunos para o curso de Gestão de E-commerce da Tegbe. Design focado em quebra de objeções e maximização de matrículas.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
        categoryLabel: "Landing Pages",
        categoryValue: "landing-pages",
        tag: "Infoproduto / Vendas",
        cta: "Ver Estratégia",
        href: "#",
    },
    {
        id: 3,
        title: "FAIP - Bolsas de 60%",
        description: "Landing page educacional desenhada com fortes gatilhos de urgência para converter visitantes em alunos matriculados através de ofertas agressivas.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
        categoryLabel: "Landing Pages",
        categoryValue: "landing-pages",
        tag: "Conversão Direta",
        cta: "Ver Estratégia",
        href: "#",
    },
    {
        id: 4,
        title: "Instituto do Sorriso - Implantes",
        description: "Página focada no setor de saúde, transmitindo total confiança e autoridade médica para alavancar os agendamentos de prótese protocolo.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800",
        categoryLabel: "Landing Pages",
        categoryValue: "landing-pages",
        tag: "Saúde / Agendamentos",
        cta: "Analisar Conversão",
        href: "#",
    },
    {
        id: 5,
        title: "Site Institucional - Tegbe",
        description: "Plataforma corporativa desenvolvida para transmitir autoridade no mercado, apresentando as soluções da empresa com um design limpo e focado na experiência do usuário.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
        categoryLabel: "Sites Inteligentes",
        categoryValue: "sites",
        tag: "Autoridade Corporativa",
        cta: "Ver Detalhes do Projeto",
        href: "#",
    }
];

// 2. EXPORTAÇÃO FORMATADA PARA O SELECTOR (Dark Section)
export const selectorOptions = [
    {
        value: "landing-pages",
        label: "Landing Pages",
        cards: portfolioData
            .filter(p => p.categoryValue === "landing-pages")
            .map(p => ({ image: p.image, title: p.title, description: p.description, cta: p.cta, tag: p.tag }))
    },
    {
        value: "sites",
        label: "Sites Inteligentes",
        cards: portfolioData
            .filter(p => p.categoryValue === "sites")
            .map(p => ({ image: p.image, title: p.title, description: p.description, cta: p.cta, tag: p.tag }))
    },
    {
        value: "automacao-ia",
        label: "Automação (IA)",
        cards: [] // Vazio, conforme você pediu
    }
];

// 3. EXPORTAÇÃO FORMATADA PARA O GRID (White Section)
export const gridImages = portfolioData.map(p => ({
    id: p.id,
    url: p.image,
    title: p.title,
    description: p.description,
    category: p.categoryLabel,
    href: p.href
}));