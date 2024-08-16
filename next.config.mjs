/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    formats: ["image/webp"],
    // domains: [
    //   "cdn.marutitech.com",
    //   "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
    path: "/_next/image/",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
