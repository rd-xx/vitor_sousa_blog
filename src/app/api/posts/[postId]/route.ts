import { z } from "zod"

import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { HttpForbiddenError, HttpNotFoundError } from "@/api/utils/errors"
import { UpdatePostSchema, updatePostSchema, uuidSchema } from "@/schemas"

export const GET = mw([
  validateMiddleware({ params: z.object({ postId: uuidSchema }) }),
  async ({ send, params, models: { PostModel } }) => {
    const post = await PostModel.query().findById(params.postId)

    if (!post) {
      throw new HttpNotFoundError()
    }

    post.views = (Number.parseInt(post.views, 10) + 1).toString()

    await post.$query().patch({ views: post.views })

    return send(post)
  },
])

export const PATCH = mw([
  authMiddleware("AUTHOR"),
  validateMiddleware({
    params: z.object({ postId: uuidSchema }),
    body: updatePostSchema,
  }),
  async ({
    send,
    session,
    params,
    input: untypedInput,
    models: { PostModel },
  }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    const input = untypedInput as UpdatePostSchema
    const post = await PostModel.query().findById(params.postId)

    if (!post) {
      throw new HttpNotFoundError()
    }

    if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
      throw new HttpForbiddenError()
    }

    const newPost = await post.$query().patch(input)

    return send(newPost)
  },
])
