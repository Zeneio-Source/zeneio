import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://zeneio-platform.vercel.app'),
  title: {
    default: 'ZENEIO | Bio-Tech & Sensual Wellness',
    template: '%s | ZENEIO',
  },
  description: 'Precision-engineered intimate wellness products. Bio-tech innovation for your most private moments. Discreet shipping worldwide.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'ZENEIO | Bio-Tech & Sensual Wellness 2026',
    description: 'Precision engineered for your most private moments. Experience intimacy evolved through pure engineering.',
    url: 'https://zeneio-platform.vercel.app',
    siteName: 'ZENEIO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
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
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-zeneio-black text-white antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            {/* Age Verification */}
            <AgeGate />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

function AgeGate() {
  // Age verification is handled client-side by the component
  return null;
}
