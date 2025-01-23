import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface PageProps {
  [key: string]: boolean;
}

const availablePages: PageProps = {
  '/': true,
  '/create-account': true,
  '/login': true,
  '/sms': true,
  '/naver/start': true,
  '/naver/complete': true,
  '/kakao/start': true,
  '/kakao/complete': true
};

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const exists = availablePages[pathname];

  if (!session.id) {
    if (!exists) {
      return Response.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return Response.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
