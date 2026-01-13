/** @type {import('next').NextConfig} */

const LOCAL_BACKEND = process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;
const SERVER_BACKEND = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const API_URL =
  process.env.NODE_ENV === "development"
    ? LOCAL_BACKEND
    : SERVER_BACKEND;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.trvl-media.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    if (!API_URL) {
      throw new Error("Backend URL is not defined");
    }

    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
