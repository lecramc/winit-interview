// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')
  const url = request.nextUrl.clone()

  if (!token && url.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && url.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|login|register|_next/static|_next/image|.*\\.png$).*)'],
}
