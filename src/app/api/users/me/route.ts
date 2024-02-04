import authMiddleware from "@/api/middlewares/auth.middleware"
import mw from "@/api/mw"

export const GET = mw([
  authMiddleware(),
  async ({ send, session, models: { UserModel, CommentModel } }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    const user = await UserModel.query()
      .findById(session.user.id)
      .select("id", "email", "username", "role")
    const commentsCount = (await CommentModel.query()
      .count()
      .where("authorId", session.user.id)) as unknown as [{ count: string }]

    return send(user, { commentsCount: commentsCount[0].count })
  },
])
