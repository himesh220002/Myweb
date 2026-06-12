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
      {
        // Proxies requests from cypherTech.online/proj1 to the Vercel app for project 1
        source: '/proj1/:path*',
        destination: 'https://proj1-placeholder.vercel.app/:path*', // TODO: Replace with real URL
      },
      {
        // Proxies requests from cypherTech.online/proj2 to the Vercel app for project 2
        source: '/proj2/:path*',
        destination: 'https://proj2-placeholder.vercel.app/:path*', // TODO: Replace with real URL
      },
      {
        // Proxies requests from cypherTech.online/proj3 to the Vercel app for project 3
        source: '/proj3/:path*',
        destination: 'https://proj3-placeholder.vercel.app/:path*', // TODO: Replace with real URL
      }
    ];
  },
};

export default nextConfig;
