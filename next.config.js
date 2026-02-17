/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/CalMU-VJK-Venture-Ecosystem-Pitch" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/CalMU-VJK-Venture-Ecosystem-Pitch/" : "",
  images: { unoptimized: true },
};

module.exports = nextConfig;
