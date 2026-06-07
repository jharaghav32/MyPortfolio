/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Serve images directly instead of via the /_next/image optimizer, which
  // isn't available on this Netlify deploy (it was 301'ing → broken image).
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
