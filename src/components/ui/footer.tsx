// src/components/ui/footer-section.tsx
'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { siteConfig } from '@/src/lib/constants';

interface FooterLink {
    title: string;
    href: string;
    icon?: string;
    isExternal?: boolean; // Adicionado para controlar como o link abre
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

// --- Textos e Links Adaptados para a Agência ---
const footerLinks: FooterSection[] = [
    {
        label: 'Soluções',
        links: [
            { title: 'Sites Inteligentes', href: '#solucoes' },
            { title: 'Landing Pages', href: '#solucoes' },
            { title: 'Automação & IA', href: '#solucoes' },
            // WhatsApp aqui também é externo
            { title: 'Consultoria Técnica', href: `${siteConfig.whatsappUrl}`, isExternal: true }, 
        ],
    },
    {
        label: 'Empresa',
        links: [
            { title: 'Quem Somos', href: '#quem-somos' },
            { title: 'Metodologia', href: '#metodologia' },
            { title: 'Dúvidas Frequentes', href: '#faq' },
            { title: 'Trabalhe Conosco', href: '#' },
        ],
    },
    {
        label: 'Recursos',
        links: [
            { title: 'Blog e Insights', href: '/blog' },
            { title: 'Portfólio', href: '#portfolio' },
            { title: 'Política de Privacidade', href: '/privacy' },
            { title: 'Termos de Serviço', href: '/terms' },
        ],
    },
    {
        label: 'Conecte-se',
        links: [
            { title: 'WhatsApp', href: siteConfig.whatsappUrl, icon: 'mdi:whatsapp', isExternal: true },
            { title: 'LinkedIn', href: siteConfig.linkedinUrl, icon: 'mdi:linkedin', isExternal: true },
            { title: 'Instagram', href: siteConfig.instagramUrl, icon: 'mdi:instagram', isExternal: true },
            { title: 'E-mail', href: `mailto:${siteConfig.email}`, icon: 'mdi:email-outline', isExternal: true },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-black relative w-full max-w-full mx-auto flex flex-col items-center justify-center border-t border-white/5 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-16 lg:py-24">
            {/* Linha de brilho superior */}
            <div className="bg-blue-500/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]" />

            <div className="grid w-full max-w-7xl gap-12 xl:grid-cols-3 xl:gap-8">
                
                {/* Logo e Copyright */}
                <AnimatedContainer className="space-y-6">
                    {/* Substitua pela sua Logo Real */}
                    <div className="flex items-center gap-3">
                        <Image 
                            src="/logo-mavellium-header.svg" 
                            width={160} 
                            height={40} 
                            alt="Mavellium Logo" 
                            className="h-8 w-auto object-contain" 
                        />
                    </div>
                    <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                        Desenhando o futuro digital de empresas com tecnologia de ponta, direto do polo tecnológico de Garça-SP.
                    </p>
                    <p className="text-zinc-600 text-xs mt-8">
                        © {new Date().getFullYear()} Mavellium. Todos os direitos reservados.
                    </p>
                </AnimatedContainer>

                {/* Links de Navegação */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-6">
                                    {section.label}
                                </h3>
                                <ul className="text-zinc-400 space-y-4 text-sm font-medium">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                // Aplicação condicional do target e rel para links externos
                                                target={link.isExternal ? "_blank" : undefined}
                                                rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                className="hover:text-white inline-flex items-center gap-2 transition-colors duration-300 group"
                                            >
                                                {link.icon && (
                                                    <Icon 
                                                        icon={link.icon} 
                                                        className="size-4 text-zinc-500 group-hover:text-blue-400 transition-colors" 
                                                    />
                                                )}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
};

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: 10, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};