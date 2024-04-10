/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextPWAConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  output: "export",
  basePath: '/hangman'
};

const withCustomPWA = withPWA(nextPWAConfig);

export default withCustomPWA(nextConfig);
