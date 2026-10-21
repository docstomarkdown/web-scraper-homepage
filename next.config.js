/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
      // Blog posts and archives moved under /blog/ (they used to render at the site root).
      { source: '/author/:author', destination: '/blog/author/:author', permanent: true },
      { source: '/category/:category', destination: '/blog/category/:category', permanent: true },
    ]
  },
}

module.exports = nextConfig
