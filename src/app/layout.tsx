import './globals.css';
import type { Metadata } from 'next';
import AgeVerification from '@/components/AgeVerification';

export const metadata: Metadata = {
  title: 'ZENEIO | Bio-Tech & Sensual Wellness 2026',
  description: 'Precision engineered for your most private moments. Experience intimacy evolved through pure engineering.',
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
