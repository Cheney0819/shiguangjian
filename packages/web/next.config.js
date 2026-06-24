/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
}

module.exports = nextConfig
