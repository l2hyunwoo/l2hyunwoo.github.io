import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isPr
  /* config options here */
};

export default nextConfig;
