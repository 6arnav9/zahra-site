// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // ADD THIS LINE
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;