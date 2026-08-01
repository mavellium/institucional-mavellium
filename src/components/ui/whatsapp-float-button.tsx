"use client";

// Reposicionamento GEO/AEO (doc/reposicionamento.md item 1.4, exceção):
// único CTA de WhatsApp fixo do site — canal alternativo, não caminho
// primário de conversão (esse papel passa a ser do formulário de
// qualificação, item 3.4). Por isso não leva mensagem pré-preenchida de
// venda.
import { Icon } from "@iconify/react";
import { siteConfig } from "@/src/lib/constants";

export function WhatsappFloatButton() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <Icon icon="mdi:whatsapp" width={30} height={30} />
    </a>
  );
}
