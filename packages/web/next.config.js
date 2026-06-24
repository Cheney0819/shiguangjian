/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin', '@prisma/client', 'prisma'],
  },
  outputFileTracingIncludes: {
    '/api/*': ['./node_modules/.prisma/client/*'],
  },
}

module.exports = nextConfig
