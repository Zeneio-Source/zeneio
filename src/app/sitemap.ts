import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zeneio-platform.vercel.app';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/shipping`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/engineering`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.2 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'always', priority: 0.2 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: 'always', priority: 0.1 },
    { url: `${baseUrl}/order-success`, lastModified: new Date(), changeFrequency: 'always', priority: 0.1 },
    { url: `${baseUrl}/setup`, lastModified: new Date(), changeFrequency: 'always', priority: 0.05 },
  ];

  // Blog posts
  const blogPosts = [
    'neural-sync-technology-explained',
    'guide-to-first-vibrator',
    'science-of-intimate-wellness',
    'privacy-in-digital-age',
    'materials-matter-silicone-vs-tpe',
    'long-distance-connection',
  ].map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  // News articles  
  const newsArticles = [
    'zeneio-pro-launch-2026',
    'ces-2026-innovation-award',
    'partnership-eu-distribution',
    'sustainability-report-2026',
    'app-update-v3',
    'research-collaboration-stanford',
  ].map((slug) => ({
      url: `${baseUrl}/news/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

  // Product pages
  const products = ['pro', 'neo', 'wand', 'micro', 'curve'].map((slug) => ({
      url: `${baseUrl}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticPages, ...blogPosts, ...newsArticles, ...products];
}
