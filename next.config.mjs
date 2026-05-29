/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/fitec-2026",
        destination: "/eventos/fitec-2026",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "me7aitdbxq.ufs.sh",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tegbe-cdn.b-cdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mavellium-janus.b-cdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
