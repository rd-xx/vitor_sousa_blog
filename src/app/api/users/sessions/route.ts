import ms from "ms"
import { cookies } from "next/headers"
import { sleep } from "radash"

import config from "@/lib/api/config"
import validateMiddleware from "@/lib/api/middlewares/validate.middleware"
import mw from "@/lib/api/mw"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/lib/api/utils/constants"
import { HttpAuthenticationError } from "@/lib/api/utils/errors"
import webConfig from "@/lib/config"
import { SignInSchema, signInSchema } from "@/lib/schemas"
import { UserUtils } from "@/lib/utils"

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
