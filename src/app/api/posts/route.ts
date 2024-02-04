import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import {
  CreatePostSchema,
  createPostSchema,
  PaginationSchema,
  paginationSchema,
} from "@/schemas/post.schemas"

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

export const POST = mw([
  authMiddleware("AUTHOR"),
  validateMiddleware({ body: createPostSchema }),
  async ({ send, session, input: untypedInput, models: { PostModel } }) => {
    if (!("user" in session)) {
      throw new Error("User not found in session")
    }

    const input = untypedInput as CreatePostSchema
    const post = await PostModel.query()
      .insert({ ...input, tags: [], authorId: session.user.id })
      .returning("*")

    return send(post)
  },
])
