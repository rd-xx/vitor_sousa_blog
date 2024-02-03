import jsonwebtoken from "jsonwebtoken"

import config from "@/api/config"
import { HttpForbiddenError } from "@/api/utils/errors"
import { ApiMiddleware, CookieJwt, RawJwt, Role } from "@/types"
import { UserUtils } from "@/utils"
import webConfig from "@/web/config"

const authMiddleware =
  (minimumRequiredRole: Role = "USER"): ApiMiddleware =>
  ({ req, session }) => {
    const authorization = req.headers.get("authorization")
    const cookies = req.cookies.get(webConfig.security.session.cookie.key)

    if (!authorization || !cookies) {
      throw new HttpForbiddenError()
    }

    jsonwebtoken.verify(authorization, config.security.jwt.secret)
    const cookiesJwt = jsonwebtoken.verify(
      cookies.value,
      config.security.jwt.secret,
    ) as CookieJwt

    if (cookiesJwt.payload !== authorization) {
      throw new HttpForbiddenError()
    }

    const jwt = jsonwebtoken.decode(cookiesJwt.payload) as RawJwt

    if (!UserUtils.hasPermission(jwt.payload, minimumRequiredRole)) {
      throw new HttpForbiddenError()
    }

    Object.assign(session as {}, jwt.payload)
  }

export default authMiddleware
