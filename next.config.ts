import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['ssl.pstatic.net'] // 허용할 도메인 추가
  }
};

export default nextConfig;
