/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
const isProduction = process.env.NODE_ENV === 'production';

const nextPWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  output: "export",
  basePath: process.env.NODE_ENV === "development" ? '' : '/hangman'
};

const withCustomPWA = withPWA(nextPWAConfig);

export default isProduction ? withCustomPWA(nextConfig) : nextConfig;
