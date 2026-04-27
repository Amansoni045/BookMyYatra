/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
