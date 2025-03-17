import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure compatibility with Cloudflare Pages
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Cloudflare Pages doesn't support Next.js Image Optimization
  },
  // Add specific configuration for Clerk
  experimental: {
    serverComponentsExternalPackages: ['@clerk/backend'],
  },
};

export default nextConfig;
