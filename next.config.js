/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow dev server access from local network IP (useful when testing on other devices)
  allowedDevOrigins: ['192.170.1.52'],
  // Enable trailing slash for static HTML files (e.g., /plans.html)
  trailingSlash: true,
  // Optional: redirect root '/' to our new Home page (handled by page.tsx)
  // No extra redirects needed.
};

module.exports = nextConfig;
