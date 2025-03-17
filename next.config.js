/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig; 