/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "127.0.0.1",
        protocol: "http",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
