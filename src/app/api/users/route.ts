import authMiddleware from "@/api/middlewares/auth.middleware"
import mw from "@/api/mw"

export const GET = mw([
  authMiddleware("ADMIN"),
  async ({ send, models: { UserModel } }) => {
    const users = await UserModel.query()
      .select("id", "email", "username", "role", "disabledUntil")
      .orderBy("updatedAt", "desc")

    return send(
      users.map(({ disabledUntil, ...user }) => ({
        ...user,
        disabled: disabledUntil ? new Date() < disabledUntil : false,
      })),
    )
  },
])
