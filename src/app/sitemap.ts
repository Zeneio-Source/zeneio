import { MetadataRoute } from 'next';

const BASE_URL = 'https://zeneio-platform.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '', '/', '/products', '/about', '/contact', '/faq', '/blog',
    '/news', '/quiz', '/shipping', '/privacy', '/terms', '/engineering',
    '/search', '/cart', '/checkout', '/order-success', '/login', '/register',
    '/account', '/account/orders', '/account/wishlist', '/account/addresses', '/account/settings',
  ];

  const productSlugs = [
    'neo-vibrating-ring-pro', 'apex-auto-stroker-elite', 'prostate-wand-x',
    'delay-spray-premium', 'sleeve-texture-master-set',
    'aura-wand-vibrator', 'bloom-rabbit-vibe', 'suction-rose-toy-pro',
    'kegel-exercise-kit-pro', 'mini-bullet-vibe-set',
    'lace-babydoll-set', 'body-stockings-set', 'satin-robe-set',
    'leather-harness-lingerie', 'lace-garter-belt-set',
  ];

  const blogSlugs = [
    'guide-to-first-vibrator', 'couples-toys-that-actually-work',
    'kegel-exercises-guide', 'lingerie-confidence-guide',
    'sex-tech-innovation-2026', 'discreet-shipping-explained',
  ];

  const newsSlugs = [
    'zeneio-launches-ai-vibrator', 'adult-wellness-market-2026',
    'discreet-shipping-trends', 'sustainable-sex-toys',
    'body-safe-materials-guide', 'valentines-day-sales-record',
  ];

  // Build sitemap entries with correct types
  const entries: { url: string; lastModified: Date; changeFrequency?: 'daily' | 'weekly' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never'; priority?: number }[] = [];

  for (const path of staticPages) {
    entries.push({
      url: `${BASE_URL}${path || ''}`,
      lastModified: new Date(),
      ...(path === '/' ? { changeFrequency: 'daily', priority: 1 } : path === '/products' ? { changeFrequency: 'weekly', priority: 0.9 } : { changeFrequency: 'weekly', priority: 0.7 }),
    });
  }

  for (const slug of productSlugs) {
    entries.push({ url: `${BASE_URL}/products/${slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  }

  for (const slug of blogSlugs) {
    entries.push({ url: `${BASE_URL}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const slug of newsSlugs) {
    entries.push({ url: `${BASE_URL}/news/${slug}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 });
  }

  return entries;
}
