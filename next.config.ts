import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev server access from local network IP (useful when testing on other devices)
  allowedDevOrigins: ['192.168.31.207', '192.170.1.52', '127.0.0.1', 'localhost'],
  // Disable trailing slash to prevent API and route issues
  trailingSlash: false,
};

export default nextConfig;
