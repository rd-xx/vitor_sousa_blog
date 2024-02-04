import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { HttpNotFoundError } from "@/api/utils/errors"
import { UpdateUserSchema, updateUserSchema } from "@/schemas"

export const PATCH = mw([
  authMiddleware("ADMIN"),
  validateMiddleware({ body: updateUserSchema }),
  async ({ send, params, input: untypedInput, models: { UserModel } }) => {
    const input = untypedInput as UpdateUserSchema

    await UserModel.query().patch(input).where("id", params.userId)

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
