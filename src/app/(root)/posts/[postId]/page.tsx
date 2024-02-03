import CommentsShowcase from "@/web/components/comments/comments-showcase"
import { api } from "@/web/services/api"

type Props = {
  params: {
    postId: string
  }
}

const Page = async ({ params }: Props) => {
  const {
    data: {
      result: [post],
    },
  } = await api.posts.getById(params.postId)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p>{post.content}</p>
      <CommentsShowcase />
    </div>
  )
}

export default Page
