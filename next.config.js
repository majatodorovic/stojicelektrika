/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const path = require("path");

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  compress: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
    domains: [
      "static.tehnomanija.rs",
      "www.tehnomanija.rs",
      "online.bancaintesa.rs",
      "api.stojic.rs",
      "25.19.215.162",
      "api.pazarishop.croonus.com",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    BASE_URL: process.env.BASE_URL,
    SEO_KEYWORDS: process.env.SEO_KEYWORDS,
    SEO_DESCRIPTION: process.env.SEO_DESCRIPTION,
    SEO_OGTITLE: process.env.SEO_OGTITLE,
    SEO_OGDESCRIPTION: process.env.SEO_OGDESCRIPTION,
    SEO_OGIMAGE: process.env.SEO_OGIMAGE,
  },
  cacheControl: {
    minimumCacheTTL: 60 * 60 * 24 * 90, 
  },
});

module.exports = nextConfig;
