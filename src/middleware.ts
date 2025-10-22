import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const HASH_REGEX = /^[a-f0-9]{64}$/;

const PROTECTED_ROUTES = [
  '/api/user-profile',
  '/api/user',
  '/api/foundation',
  '/api/donations',
  '/api/campaign',
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;

  const token = req.cookies.get('token')?.value;

  const isProtected = PROTECTED_ROUTES.some(route => path.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const lastSegment = path.split('/').pop() || '';
  if (isProtected && lastSegment.length === 64 && !HASH_REGEX.test(lastSegment)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: PROTECTED_ROUTES.map(route => `${route}/:path*`),
};
