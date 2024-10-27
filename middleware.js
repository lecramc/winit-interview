// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('authToken')
  const url = request.nextUrl.clone()
  console.log('PATHNAME: ' + url.pathname)
  console.log('TOKEN: ' + token)

  if (!token && url.pathname !== '/login' && url.pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (
    token &&
    (url.pathname === '/' || url.pathname === '/login' || url.pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
