import authMiddleware from "@/api/middlewares/auth.middleware"
import mw from "@/api/mw"

export const GET = mw([
  authMiddleware("ADMIN"),
  async ({ send, models: { UserModel } }) => {
    const users = await UserModel.query().select(
      "id",
      "email",
      "username",
      "role",
    )

    return send(users)
  },
])
