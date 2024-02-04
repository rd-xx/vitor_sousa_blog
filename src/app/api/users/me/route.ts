import authMiddleware from "@/api/middlewares/auth.middleware"
import mw from "@/api/mw"

export const GET = mw([
  authMiddleware(),
  async ({ send, session, models: { UserModel } }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    const user = await UserModel.query()
      .findById(session.user.id)
      .select("id", "email", "username", "role")

    return send(user)
  },
])
