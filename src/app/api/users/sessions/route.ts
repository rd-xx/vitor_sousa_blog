import ms from "ms"
import { cookies } from "next/headers"
import { sleep } from "radash"

import config from "@/api/config"
import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/api/utils/constants"
import { HttpAuthenticationError } from "@/api/utils/errors"
import { SignInSchema, signInSchema } from "@/schemas"
import { UserUtils } from "@/utils"
import webConfig from "@/web/config"

export const POST = mw([
  validateMiddleware({ body: signInSchema }),
  async ({ send, input: untypedInput, models: { UserModel } }) => {
    const input = untypedInput as SignInSchema
    const user = await UserModel.query().findOne({
      email: input.email,
      disabledUntil: null,
    })

    if (!user) {
      await sleep(AVERAGE_PASSWORD_HASHING_DURATION)

      throw new HttpAuthenticationError()
    }

    const { hash } = await UserUtils.hashPassword(
      input.password,
      user.passwordSalt,
    )

    if (hash !== user.passwordHash) {
      throw new HttpAuthenticationError()
    }

    const { jwt, cookieJwt } = UserUtils.signToken(user)

    cookies().set(webConfig.security.session.cookie.key, cookieJwt, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: webConfig.security.session.cookie.secure,
      expires: Date.now() + ms(config.security.jwt.expiresIn),
    })

    return send({ jwt })
  },
])

export const DELETE = mw([
  authMiddleware,
  ({ send }) => {
    cookies().set(webConfig.security.session.cookie.key, "null", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: webConfig.security.session.cookie.secure,
      expires: Date.now() - ms("10 years"),
    })

    return send(true)
  },
])
