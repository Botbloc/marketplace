// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: '/marketplace',
  assetPrefix: '/marketplace/',
};

export default nextConfig;
