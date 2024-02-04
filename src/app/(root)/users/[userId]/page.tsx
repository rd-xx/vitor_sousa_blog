import PostCard from "@/web/components/posts/post-card"
import { api } from "@/web/services/api"

type Props = {
  params: {
    userId: string
  }
}

const Page = async ({ params }: Props) => {
  const {
    data: {
      result: [user],
    },
  } = await api.users.get(params.userId)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {user.posts.map((post) => (
          <PostCard key={post.id} post={post} author={user} />
        ))}
      </div>
    </div>
  )
}

export default Page
