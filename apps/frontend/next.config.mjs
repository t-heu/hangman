/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import { fileURLToPath } from 'url';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// Resolve __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextPWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const nextConfigFromPWA = {
  reactStrictMode: false,
  swcMinify: false,
  output: "export",
  basePath: process.env.BUILD_IN_DEV ? "/out" : '/hangman',
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias['common'] = path.resolve(__dirname, '../../packages/common/src');
    return config;
  },
};

const nextConfig = {
  output: "export",
  basePath: '',
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias['common'] = path.resolve(__dirname, '../../packages/common/src');
    return config;
  },
};

const withCustomPWA = withPWA(nextPWAConfig);

export default isProduction ? withCustomPWA(nextConfigFromPWA) : nextConfig;
