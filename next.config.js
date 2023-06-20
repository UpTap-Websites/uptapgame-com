/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
