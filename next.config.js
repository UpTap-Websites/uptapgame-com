/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.iwantalipstick.com",
      },
    ],
  },
};

module.exports = nextConfig;
