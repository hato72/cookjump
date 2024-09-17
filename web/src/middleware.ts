import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/:path*'],
}

export function middleware(req: NextRequest) {
  const basicAuthUser = process.env.BASIC_AUTH_USER
  const basicAuthPass = process.env.BASIC_AUTH_PASS
  if (!(basicAuthUser && basicAuthPass)) {
    return NextResponse.next()
  }

  const authorization = req.headers.get('authorization')
  if (authorization) {
    const authValue = authorization.split(' ')[1] ?? ''
    const [user, pass] = atob(authValue).split(':')
    if (user === basicAuthUser && pass === basicAuthPass) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
