import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import { PaginationSchema, paginationSchema } from "@/schemas/post.schemas"

export const GET = mw([
  validateMiddleware({ query: paginationSchema }),
  async ({ send, input: untypedInput, models: { PostModel } }) => {
    const input = untypedInput as PaginationSchema
    const query = PostModel.query()
    const posts = await query
      .clone()
      .withGraphFetched("author")
      .orderBy("updatedAt", "desc")
      .page(input.page - 1, input.perPage)

    return send(posts.results)
  },
])
