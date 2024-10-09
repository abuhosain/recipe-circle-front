import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/AuthService'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();
    console.log("decode", user)
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}