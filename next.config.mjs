/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 👇 AUMENTA EL LÍMITE DEL BODY
  experimental: {
    serverActions: {
      bodySizeLimit: "150mb",
    },
  },
}

export default nextConfig
