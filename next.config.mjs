/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const isProduction = process.env.NODE_ENV === 'production';

const nextPWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const nextConfigFromPWA = {
  reactStrictMode: false,
  swcMinify: false,
  output: "export",
  basePath: '/hangman'
};

const nextConfig = {
  output: "export",
  basePath: ''
};

const withCustomPWA = withPWA(nextPWAConfig);

export default isProduction ? withCustomPWA(nextConfigFromPWA) : nextConfig;
