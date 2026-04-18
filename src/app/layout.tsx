import './globals.css';
import type { Metadata } from 'next';
import AgeVerification from '@/components/AgeVerification';

export const metadata: Metadata = {
  metadataBase: new URL('https://zeneio-platform.vercel.app'),
  title: 'ZENEIO | Bio-Tech & Sensual Wellness 2026',
  description: 'Precision engineered for your most private moments. Experience intimacy evolved through pure engineering.',
  icons: {
    icon: '/logo-brand.png',
    apple: '/logo-brand.png',
  },
  openGraph: {
    title: 'ZENEIO | Bio-Tech & Sensual Wellness 2026',
    description: 'Precision engineered for your most private moments. Experience intimacy evolved through pure engineering.',
    url: 'https://zeneio-platform.vercel.app',
    siteName: 'ZENEIO',
    images: [
      {
        url: '/logo-brand.png',
        width: 1200,
        height: 1200,
        alt: 'ZENEIO - Bio-Tech Sensual Wellness',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZENEIO | Bio-Tech & Sensual Wellness 2026',
    description: 'Precision engineered for your most private moments.',
    images: ['/logo-brand.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Uncut+Sans:wght@300;400;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="liquid-bg antialiased">
        <AgeVerification />
        {children}
      </body>
    </html>
  );
}
