"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

// --- Props simplificadas ---
export interface HeaderProps {
  variant?: "default" | "marketing";
  lightBg?: boolean;
  logo: string;
  logoAlt: string;
  links: Array<{ name: string; href: string }>;
  ctaLink: string;
  ctaText: string;
}

export function Header({
  variant = "default",
  lightBg = false,
  logo,
  logoAlt,
  links,
  ctaLink,
  ctaText,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Detecta scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Foco no primeiro item do menu quando aberto
  useEffect(() => {
    if (menuOpen && firstMenuItemRef.current) {
      setTimeout(() => firstMenuItemRef.current?.focus(), 100);
    }
  }, [menuOpen]);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  // Cores por variante
  const theme = useMemo(() => {
    if (variant === "marketing") {
      return {
        primary: "bg-[#E31B63]",
        hoverBg: "hover:bg-[#FF1758]",
        textOnPrimary: "text-white",
        underline: "bg-[#E31B63]",
        logoFilter: "brightness-0 invert",
      };
    }
    return {
      primary: "bg-[#FFFFFF]",
      hoverBg: "hover:bg-white/90",
      textOnPrimary: "text-black",
      underline: "bg-[#ffffff]",
      logoFilter: "",
    };
  }, [variant]);

  // SEU ESTILO ORIGINAL INTACTO
  const headerStyles = useMemo(() => {
    if (menuOpen) return "bg-[#050505] py-5 border-b border-white/10";
    if (lightBg) {
      return scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm py-3"
        : "bg-white border-b border-zinc-100 py-6";
    }
    return scrolled
      ? "bg-black/20 backdrop-blur-2xl backdrop-saturate-[1.5] bg-gradient-to-b from-white/[0.08] via-transparent to-white/[0.03] border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.15),inset_0_-1px_1px_0_rgba(255,255,255,0.1)] py-3"
      : "bg-transparent border-b border-transparent py-6";
  }, [scrolled, menuOpen, lightBg]);

  const handleMenuToggle = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    if (!newState) {
      menuButtonRef.current?.focus();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${headerStyles}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* LOGO */}
            <div className={`flex-shrink-0 ${!lightBg ? "mix-blend-difference" : ""}`}>
              <Link
                href="/"
                className="flex items-center group transition-transform active:scale-95"
                onClick={() => setMenuOpen(false)}
                aria-label={`Ir para página inicial - ${logoAlt}`}
              >
                <Image
                  src={logo}
                  alt={logoAlt}
                  width={160}
                  height={40}
                  priority
                  className={`w-28 sm:w-32 md:w-36 lg:w-45 h-auto object-contain transition-all duration-300 group-hover:opacity-80 brightness-0 ${!lightBg ? "invert" : ""} ${theme.logoFilter}`}
                />
              </Link>
            </div>

            {/* NAVEGAÇÃO DESKTOP */}
            <nav
              aria-label="Menu principal"
              className={`hidden xl:flex items-center gap-x-8 ${!lightBg ? "mix-blend-difference" : ""}`}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium tracking-tight transition-all duration-300 relative group ${lightBg ? "text-zinc-800 hover:text-zinc-900" : "text-white hover:opacity-80"}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${lightBg ? "bg-zinc-900" : "bg-white"}`}
                  />
                </Link>
              ))}
            </nav>

            {/* AÇÕES (CTA + MENU MOBILE) */}
            <div className={`flex items-center gap-3 sm:gap-6 ${!lightBg ? "mix-blend-difference" : ""}`}>
              <Link
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block group relative"
                aria-label={ctaText}
              >
                <div
                  className={`absolute -inset-0.5 rounded-full opacity-30 blur-sm transition duration-500 group-hover:opacity-60 ${lightBg ? "bg-blue-500" : "bg-white"}`}
                />
                <button
                  className={`relative inline-flex cursor-pointer h-9 lg:h-11 items-center justify-center overflow-hidden rounded-full px-5 lg:px-8 py-2 font-bold text-[10px] lg:text-xs tracking-[0.1em] transition-all duration-300 hover:scale-105 active:scale-95 border ${
                    lightBg
                      ? "bg-blue-600 text-white hover:bg-blue-500 border-blue-600"
                      : `border-white/10 ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`
                  }`}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                  <span className="relative z-20 uppercase">{ctaText}</span>
                </button>
              </Link>

              {/* BOTÃO MENU MOBILE */}
              <Button
                ref={menuButtonRef}
                size="icon"
                variant="ghost"
                className={`xl:hidden rounded-full z-[110] ${lightBg ? "text-zinc-700 hover:bg-zinc-100" : "text-white hover:bg-white/5"}`}
                onClick={handleMenuToggle}
                aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Icon
                  icon={menuOpen ? "ph:x-light" : "ph:list-light"}
                  className="size-8 transition-all duration-300"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE OVERLAY - Intacto */}
        {menuOpen && (
          <div
            className="fixed inset-0 xl:hidden z-[99]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Backdrop escurecido */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Conteúdo do menu */}
            <div
              ref={menuRef}
              id="mobile-menu"
              className={`absolute top-0 left-0 right-0 w-full h-screen bg-[#050505] overflow-y-auto overscroll-contain flex flex-col items-center pt-24 pb-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
              }`}
            >
              <h2 id="mobile-menu-title" className="sr-only">
                Menu de navegação
              </h2>

              <nav
                className="flex flex-col items-center space-y-8 px-6 w-full"
                aria-label="Navegação principal mobile"
              >
                {links.map((link, i) => (
                  <Link
                    key={link.name}
                    ref={i === 0 ? firstMenuItemRef : undefined}
                    href={link.href}
                    style={{ transitionDelay: menuOpen ? `${i * 70}ms` : "0ms" }}
                    className={`text-3xl font-light tracking-tighter text-white/70 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30 focus:rounded-lg ${
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                ))}

                <div
                  className={`pt-10 flex flex-col items-center gap-8 w-full max-w-xs transition-all duration-700 delay-300 ${
                    menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="h-[1px] w-12 bg-white/20" aria-hidden="true" />
                  <Link
                    href={ctaLink}
                    className={`w-full text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 shadow-2xl shadow-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`}
                    onClick={() => setMenuOpen(false)}
                    aria-label={ctaText}
                  >
                    {ctaText}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}