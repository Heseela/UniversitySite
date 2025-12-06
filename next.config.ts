import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self'",
          //     "img-src 'self' data: https://res.cloudinary.com https://*.cloudinary.com",
          //     // Use strict-dynamic to allow scripts loaded by Next.js runtime
          //     // This allows Next.js to load its own scripts while preventing XSS
          //     "script-src 'self' 'strict-dynamic' 'unsafe-eval'",
          //     // Allow inline styles for Tailwind CSS and Next.js
          //     // In production, consider using nonces for better security
          //     "style-src 'self' 'unsafe-inline'",
          //     "font-src 'self' data:",
          //     "connect-src 'self' https://res.cloudinary.com https://*.cloudinary.com",
          //     "frame-src 'self'",
          //     "object-src 'none'",
          //     "base-uri 'self'",
          //     "form-action 'self'",
          //     "frame-ancestors 'self'",
          //     "upgrade-insecure-requests",
          //     // Trusted Types for DOM XSS protection
          //     "require-trusted-types-for 'script'",
          //   ].join('; '),
          // },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    qualities: [25, 50, 75, 85, 100],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
