import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { HttpDuplicateError } from "@/api/utils/errors"
import { SignUpSchema, signUpSchema } from "@/schemas"
import { UserUtils } from "@/utils"

export const POST = mw([
  validateMiddleware({ body: signUpSchema }),
  async ({ send, input: untypedInput, models: { UserModel } }) => {
    const input = untypedInput as SignUpSchema
    const query = UserModel.query()
    const user = await query
      .clone()
      .select("email", "username")
      .orWhereILike("email", input.email)
      .orWhereILike("username", input.username)
      .first()

    if (user?.email === input.email) {
      throw new HttpDuplicateError("user", user.email, "email")
    }

    if (user?.username === input.username) {
      throw new HttpDuplicateError("user", user.username, "username")
    }

    const { hash, salt } = await UserUtils.hashPassword(input.password)

    await UserModel.query().insert({
      email: input.email,
      username: input.username,
      passwordHash: hash,
      passwordSalt: salt,
    })

    return send(true)
  },
])
