import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ssl.pstatic.net'
      },
      {
        hostname: 'k.kakaocdn.net'
      },
      {
        hostname: 'www.gravatar.com'
      }
    ],
    domains: ['localhost']
  }
  // images: {
  //   domains: ['ssl.pstatic.net']
  // }
};

export default nextConfig;
