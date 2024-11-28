/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "config.junshiun.com",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
