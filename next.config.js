module.exports = {
  // images: {
  //   domains: ["cdn.iwantalipstick.com", "lab.uptapgame.com"],
  //   formats: ["image/avif", "image/webp"],
  //   // minimumCacheTTL: 60,
  //   deviceSizes: [640, 750, 1080, 1200, 1920],
  //   imageSizes: [64, 96, 128, 256],
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  // },

  images: {
    unoptimized: true,
  },

  swcMinify: true,
  reactStrictMode: true,

  // trailingSlash: true,

  generateBuildId: async () => {
    return "20220909";
  },
};
