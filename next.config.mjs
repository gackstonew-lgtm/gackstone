/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [],
  },
  async redirects() {
    return [
      // The former Insights page was replaced by Pricing; keep old links alive.
      { source: "/insights", destination: "/pricing", permanent: true },
    ];
  },
};

export default nextConfig;
