import authMiddleware from "@/api/middlewares/auth.middleware"
import validateMiddleware from "@/api/middlewares/validate.middleware"
import mw from "@/api/mw"
import {
  CreatePostSchema,
  createPostSchema,
  GetPostsSchema,
  getPostsSchema,
} from "@/schemas/post.schemas"

export const GET = mw([
  validateMiddleware({ query: getPostsSchema }),
  async ({ send, input: untypedInput, models: { PostModel } }) => {
    const input = untypedInput as GetPostsSchema
    const query = PostModel.query()

    if (input.authorId) {
      query.where("authorId", input.authorId)
    }

    // Pagination is purposefully disabled is not yet implemented in the frontend
    const posts = await query
      .withGraphFetched("author")
      .orderBy("updatedAt", "desc")
    // .page(input.page - 1, input.perPage)

    return send(posts)
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
