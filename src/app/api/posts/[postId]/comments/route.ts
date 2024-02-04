import { z } from "zod"

import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { CreateCommentSchema, createCommentSchema, uuidSchema } from "@/schemas"

export const GET = mw([
  validateMiddleware({ params: z.object({ postId: uuidSchema }) }),
  async ({ send, params, models: { CommentModel } }) => {
    const comments = await CommentModel.query()
      .where("postId", params.postId)
      .withGraphFetched("author")
      .orderBy("createdAt", "desc")

    return send(comments)
  },
])

export const POST = mw([
  authMiddleware(),
  validateMiddleware({
    body: createCommentSchema,
  }),
  async ({
    send,
    session,
    params,
    input: untypedInput,
    models: { CommentModel },
  }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    const input = untypedInput as CreateCommentSchema
    const comment = await CommentModel.query().insert({
      ...params,
      ...input,
      authorId: session.user.id,
    })

    return send(comment)
  },
])
