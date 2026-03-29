import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "me7aitdbxq.ufs.sh", // Para os links de vídeo/imagem do demo original
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // Caso use imagens do Pexels
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co", // Caso use imagens do Pexels
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
