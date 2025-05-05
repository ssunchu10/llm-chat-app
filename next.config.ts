import type { NextConfig } from 'next';
import path from 'path';
import initializeBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias['@app'] = path.resolve(__dirname, 'app');
    return config;
  }
};

export default withBundleAnalyzer(nextConfig);
