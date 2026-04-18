import { MetadataRoute } from 'next';

const BASE_URL = 'https://zeneio-platform.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    '', '/', '/products', '/about', '/contact', '/faq', '/blog',
    '/news', '/quiz', '/shipping', '/privacy', '/terms', '/engineering',
    '/search', '/cart', '/checkout', '/order-success', '/login', '/register',
    '/account', '/account/orders', '/account/wishlist', '/account/addresses', '/account/settings',
  ];

  // Product pages
  const productSlugs = [
    'neo-vibrating-ring-pro', 'apex-auto-stroker-elite', 'prostate-wand-x',
    'delay-spray-premium', 'sleeve-texture-master-set',
    'aura-wand-vibrator', 'bloom-rabbit-vibe', 'suction-rose-toy-pro',
    'kegel-exercise-kit-pro', 'mini-bullet-vibe-set',
    'lace-babydoll-set', 'body-stockings-set', 'satin-robe-set',
    'leather-harness-lingerie', 'lace-garter-belt-set',
  ];

  // Blog posts
  const blogSlugs = [
    'guide-to-first-vibrator', 'couples-toys-that-actually-work',
    'kegel-exercises-guide', 'lingerie-confidence-guide',
    'sex-tech-innovation-2026', 'discreet-shipping-explained',
  ];

  // News articles
  const newsSlugs = [
    'zeneio-launches-ai-vibrator', 'adult-wellness-market-2026',
    'discreet-shipping-trends', 'sustainable-sex-toys',
    'body-safe-materials-guide', 'valentines-day-sales-record',
  ];

  return [
    ...staticPages.map(path => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '/' ? 'daily' : 'weekly' as const,
      priority: (path === '/') ? 1 : (path === '/products' ? 0.9 : 0.7),
    })),
    ...productSlugs.map(slug => ({
      url: `${BASE_URL}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...blogSlugs.map(slug => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...newsSlugs.map(slug => ({
      url: `${BASE_URL}/news/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
