import Link from "next/link"

import { MinimalUser, Post, User } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"
import AuthorName from "@/web/components/users/author-name"

type Props = {
  post: Omit<Post, "author">
  author: MinimalUser | User
}

const PostCard = ({ post, author }: Props) => (
  <Card className="w-96 hover:scale-105 transition-transform">
    <CardHeader>
      <Link href={`/posts/${post.id}`}>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
      </Link>
    </CardHeader>
    <CardContent>
      <p>{post.content.substring(0, 100)}...</p>
    </CardContent>
    <CardFooter>
      <p>
        <AuthorName author={author} /> -{" "}
        {new Intl.DateTimeFormat("fr-FR").format(new Date(post.createdAt))}
      </p>
    </CardFooter>
  </Card>
)

export default PostCard
