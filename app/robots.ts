import type { MetadataRoute } from 'next';

const SITE_URL = 'https://lalanmena.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/demo', '/celestial'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
