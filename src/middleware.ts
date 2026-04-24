import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that don't require age verification
const PUBLIC_PATHS = [
  '/age-verification',
  '/api',
  '/houtai',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/og-image.png',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check age verification cookie
  const verified = request.cookies.get('zeneio_age_verified')?.value;

  if (!verified) {
    const url = request.nextUrl.clone();
    url.pathname = '/age-verification';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)).*)',
  ],
};
