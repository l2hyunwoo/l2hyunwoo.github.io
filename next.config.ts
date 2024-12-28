import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProduction ? 'https://l2hyunwoo.github.io' : undefined,
  /* config options here */
};

export default nextConfig;
