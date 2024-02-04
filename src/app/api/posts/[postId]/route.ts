import { z } from "zod"

import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { HttpNotFoundError } from "@/api/utils/errors"
import { uuidSchema } from "@/schemas"

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
