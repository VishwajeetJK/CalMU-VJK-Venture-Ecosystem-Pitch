/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/CalMU-VJK-Venture-Ecosystem-Pitch" : "");
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: { unoptimized: true },
};

module.exports = nextConfig;
