import { NextRequest, NextResponse } from "next/server"

import webConfig from "@/web/config"

export const middleware = (request: NextRequest) => {
  if (!request.cookies.has(webConfig.security.session.cookie.key)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
}
