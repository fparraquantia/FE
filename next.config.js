/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: "build",
  reactStrictMode: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/connect",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
