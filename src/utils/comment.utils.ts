import { JwtPayload } from "@/types"
import { api } from "@/web/services/api"

type GetCommentsReponse = Awaited<ReturnType<typeof api.comments.getByPostId>>

const mergeComments =
  (values: { content: string; postId: string }, session: JwtPayload) =>
  (response: GetCommentsReponse) => ({
    ...response,
    data: {
      ...response.data,
      result: [
        {
          ...values,
          id: Math.random().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          authorId: session.user.id,
          author: session.user,
        },
        ...response.data.result,
      ],
    },
  })

export const CommentUtils = {
  mergeComments,
}
