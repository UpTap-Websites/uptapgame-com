module.exports = {
  images: {
    domains: ["cdn.iwantalipstick.com", "lab.uptapgame.com"],
    formats: ["image/avif", "image/webp"],
    // minimumCacheTTL: 60,
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [96, 128, 256],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "development" ? false : true,
  },
};
