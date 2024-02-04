import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"
import UpdatePostDialog from "@/web/components/posts/update-post-dialog"
import { api } from "@/web/services/api"

type Props = {
  userId: string
}

const AuthorPostsShowcase = async ({ userId }: Props) => {
  const {
    data: { result: posts },
  } = await api.posts.get({ authorId: userId })

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Posts ({posts.length})</h1>
      {posts.map((post) => (
        <Card key={post.id} className="flex justify-between space-y-0">
          <CardHeader>
            <Link href={`/posts/${post.id}`}>
              <CardTitle className="text-xl w-fit">{post.title}</CardTitle>
            </Link>
            <CardDescription>ID : {post.id}</CardDescription>
            <CardDescription>Vues : {post.views}</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatePostDialog post={post} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default AuthorPostsShowcase
