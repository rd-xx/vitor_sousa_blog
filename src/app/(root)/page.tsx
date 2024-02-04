import PostCard from "@/web/components/posts/post-card"
import { api } from "@/web/services/api"

const Page = async () => {
  const { data } = await api.posts.get({})

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {data.result.map((post) => (
        <PostCard key={post.id} post={post} author={post.author} />
      ))}
    </div>
  )
}

export default Page
