import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

const SITE_URL = 'https://lalanmena.com';

const STATIC_ROUTES = [
  '',
  '/lalan-hakkinda',
  '/plantasyonlar',
  '/products',
  '/sertifikalar',
  '/sunumlar',
  '/surdurulebilirlik',
  '/tarihce',
  '/eldiven-bulucu',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map(p => ({
    url: `${SITE_URL}/products/${p.id}`,
    lastModified: new Date(),
  }));

  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  const categoryEntries: MetadataRoute.Sitemap = categories.map(slug => ({
    url: `${SITE_URL}/products/category/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries, ...categoryEntries];
}
