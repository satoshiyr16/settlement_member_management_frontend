import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieName = process.env.COOKIE_KEY_NAME || 'settlement_local_session'
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(cookieName)?.value

  let authCheckUrl = ''
  let redirectUrl = ''

  if (request.nextUrl.pathname.startsWith('/member')) {
    authCheckUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/member/auth`
    redirectUrl = '/guest/login'

    if (!sessionCookie || !authCheckUrl || !redirectUrl) {
      const toRedirectUrl = new URL(redirectUrl, request.url)
      const response = NextResponse.redirect(toRedirectUrl)

      return response
    }

    try {
      const urlOrigin = request.nextUrl.origin
      const response = await fetch(authCheckUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Cookie: `${cookieName}=${sessionCookie}`,
          Origin: urlOrigin,
        },
      })

      if (!response.ok) {
        const toRedirectUrl = new URL(redirectUrl, request.url)
        return NextResponse.redirect(toRedirectUrl)
      }

      return NextResponse.next()
    } catch {
      const toRedirectUrl = new URL(redirectUrl, request.url)

      return NextResponse.redirect(toRedirectUrl)
    }
  }
}

export const config = {
  matcher: ['/member/:path*'],
}
