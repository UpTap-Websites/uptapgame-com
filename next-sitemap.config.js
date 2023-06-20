/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.uptapgame.com",
  // generateRobotsTxt: true, // (optional)
  // ...other options
  exclude: ["/t/privacy-policy", "/t/terms-of-use"],
};

// export default config;
