// src/lib/constants.ts

// 1. Declaramos o telefone isoladamente primeiro
const PHONE_NUMBER = "5514991779502";

// 2. Exportamos as configurações usando a constante acima
export const siteConfig = {
  phone: PHONE_NUMBER,
  whatsappUrl: `https://wa.me/${PHONE_NUMBER}`,
  email: "contato@mavellium.com.br",
  instagramUrl: "https://www.instagram.com/mavellium/",
  linkedinUrl: "https://www.linkedin.com/company/mavellium",
};

// 3. Exportamos a função geradora de mensagens
export const getWhatsappUrl = (message: string) => {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};