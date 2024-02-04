import { pick } from "radash"
import { z } from "zod"

import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { HttpForbiddenError, HttpNotFoundError } from "@/api/utils/errors"
import { UpdateUserSchema, updateUserSchema } from "@/schemas"
import { DateUtils } from "@/utils"

export const GET = mw([
  validateMiddleware({ params: z.object({ userId: z.string().uuid() }) }),
  async ({ send, params, models: { UserModel } }) => {
    const user = await UserModel.query()
      .findById(params.userId)
      .withGraphFetched("posts")
      .select("id", "username", "email", "role")

    if (!user) {
      throw new HttpNotFoundError()
    }

    return send(user)
  },
])

export const PATCH = mw([
  authMiddleware(),
  validateMiddleware({ body: updateUserSchema }),
  async ({
    send,
    session,
    params,
    input: untypedInput,
    models: { UserModel },
  }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    if (params.userId !== session.user.id && session.user.role !== "ADMIN") {
      throw new HttpForbiddenError()
    }

    const { disabled, ...input } = untypedInput as UpdateUserSchema
    const payload =
      session.user.role === "ADMIN"
        ? {
            ...input,
            disabledUntil: disabled ? DateUtils.addYears(new Date(), 10) : null,
          }
        : pick(input, ["email", "username"])

    await UserModel.query().patch(payload).where("id", params.userId)

    return send(true)
  },
])

export const DELETE = mw([
  authMiddleware("ADMIN"),
  async ({ send, params, models: { UserModel } }) => {
    const user = await UserModel.query().findById(params.userId)

    if (!user) {
      throw new HttpNotFoundError()
    }

    await UserModel.query().delete().where("id", params.userId)

    return send(true)
  },
])
