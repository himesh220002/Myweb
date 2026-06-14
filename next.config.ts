import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      // ----- Project 1: Trading Skill Site -----
      {
        source: '/digitskill',
        destination: 'https://trading-skill-site.vercel.app/digitskill',
      },
      {
        source: '/digitskill/:path*',
        destination: 'https://trading-skill-site.vercel.app/digitskill/:path*',
      },

      // ----- Project 2: Yamaha Bike Showroom -----
      {
        source: '/yamahabikes',
        destination: 'https://bike-showroom-client.vercel.app/yamahabikes',
      },
      {
        source: '/yamahabikes/:path*',
        destination: 'https://bike-showroom-client.vercel.app/yamahabikes/:path*',
      },

      // ----- Project 3: Placeholder -----
      {
        source: '/codeforge',
        destination: 'https://code-forge-lilac-eight.vercel.app/codeforge',
      },
      {
        source: '/codeforge/:path*',
        destination: 'https://code-forge-lilac-eight.vercel.app/codeforge/:path*',
      }
    ];
  },
};

export default nextConfig;
