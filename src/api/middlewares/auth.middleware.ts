import jsonwebtoken, { JwtPayload } from "jsonwebtoken"

import config from "@/api/config"
import { HttpForbiddenError } from "@/api/utils/errors"
import { ApiMiddleware } from "@/types"
import webConfig from "@/web/config"

const authMiddleware: ApiMiddleware = ({ req }) => {
  const authorization = req.headers.get("authorization")
  const cookies = req.cookies.get(webConfig.security.session.cookie.key)

  if (!authorization || !cookies) {
    throw new HttpForbiddenError()
  }

  jsonwebtoken.verify(authorization, config.security.jwt.secret)
  const cookiesJwt = jsonwebtoken.verify(
    cookies.value,
    config.security.jwt.secret,
  ) as JwtPayload

  if (cookiesJwt.payload !== authorization) {
    throw new HttpForbiddenError()
  }
}

export default authMiddleware
