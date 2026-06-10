/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Ensure API routes can write to filesystem in dev; on Vercel use env vars
  experimental: {},
};

export default nextConfig;
