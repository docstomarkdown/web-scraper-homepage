const isDev = process.env.NODE_ENV === 'development'

// The admin app the support form posts tickets to (same default as components/support/support-form.tsx).
const adminOrigin = new URL(
  process.env.NEXT_PUBLIC_ADMIN_URL || (isDev ? 'http://localhost:3100' : 'https://admin.webscraper.pro')
).origin

// Content-Security-Policy: everything the pages load, by where it comes from.
// - Google Analytics 4 (gtag.js, app/layout.tsx): script from www.googletagmanager.com, hits to
//   *.google-analytics.com, *.analytics.google.com and www.google.com/g/collect. Turning on Google signals
//   or Ads features in the GA property adds *.g.doubleclick.net and other Google domains.
// - Microsoft Clarity (components/clarity-provider.tsx): tag from www.clarity.ms, recorder script from
//   scripts.clarity.ms, data to *.clarity.ms and c.bing.com.
// - Cloudflare Turnstile (support form): script and iframe from challenges.cloudflare.com.
// - Guide videos (components/VideoEmbed.tsx): iframe from www.youtube-nocookie.com.
// - Support form: tickets to the admin app; large attachments PUT straight to R2 with a signed URL.
// - Google Fonts stylesheet and font files (app/layout.tsx); flag images from flagcdn.com (tools).
// 'unsafe-inline' in script-src: every page is prerendered to static HTML, so there is no per-request nonce,
// and Next.js's inline bootstrap scripts plus the theme and support-prefill scripts must run. style-src needs
// it for React style attributes and next/font. 'unsafe-eval' is development only (React's dev tooling).
const csp = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev && "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://*.clarity.ms',
    'https://challenges.cloudflare.com',
  ],
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  [
    "img-src 'self' data: blob:",
    'https://flagcdn.com',
    'https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com',
    'https://*.clarity.ms https://c.bing.com',
  ],
  [
    "connect-src 'self'",
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com',
    'https://*.clarity.ms https://c.bing.com',
    adminOrigin,
    'https://*.r2.cloudflarestorage.com',
  ],
  'frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com',
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
]
  .map((directive) => (Array.isArray(directive) ? directive.filter(Boolean).join(' ') : directive))
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // frame-ancestors covers current browsers; X-Frame-Options covers older ones.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // No page uses these; the tools copy to the clipboard, which stays allowed.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), browsing-topics=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // X-Robots-Tag (noindex) is set in middleware.ts, not here.
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        // No pricing is shown until billing is live; old links to /pricing land on the homepage. Temporary
        // (not permanent) so a real pricing page can take this address later.
        source: '/pricing',
        destination: '/',
        permanent: false,
      },
      {
        // The contact form was replaced by the support form, which reaches the same inbox.
        source: '/contact',
        destination: '/support',
        permanent: true,
      },
      // Google Maps pages moved to mapsscraper.pro, which covers Maps only (2026-10-28). The feature page was live;
      // the four others were drafts, redirected in case their URLs were shared in review.
      { source: '/maps-leads', destination: 'https://mapsscraper.pro/', permanent: true },
      { source: '/scrapers/maps', destination: 'https://mapsscraper.pro/', permanent: true },
      { source: '/guides/get-local-business-leads-from-maps', destination: 'https://mapsscraper.pro/guides/scrape-local-business-leads-free', permanent: true },
      { source: '/guides/get-maps-leads-with-emails', destination: 'https://mapsscraper.pro/guides/get-emails-from-maps', permanent: true },
      { source: '/guides/get-phone-numbers-from-maps', destination: 'https://mapsscraper.pro/guides/extract-phone-numbers-from-maps', permanent: true },
      // Blog posts and archives moved under /blog/ (they used to render at the site root).
      { source: '/author/:author', destination: '/blog/author/:author', permanent: true },
      { source: '/category/:category', destination: '/blog/category/:category', permanent: true },
    ]
  },
}

module.exports = nextConfig
