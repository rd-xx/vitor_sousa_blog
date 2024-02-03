"use server"

import jsonwebtoken from "jsonwebtoken"

import getSessionCookie from "@/api/utils/getSessionCookie"
import { CookieJwt, RawJwt } from "@/types"

const getSession = () => {
  const sessionCookie = getSessionCookie()

  if (!sessionCookie) {
    return null
  }

  const { payload: cookieJwtPayload } = jsonwebtoken.decode(
    sessionCookie,
  ) as CookieJwt
  const { payload } = jsonwebtoken.decode(cookieJwtPayload) as RawJwt

  return payload
}

export default getSession
