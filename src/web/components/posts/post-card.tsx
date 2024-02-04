"use client"

import { useRouter } from "next/navigation"

import { Post } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"
import AuthorName from "@/web/components/users/author-name"

type Props = {
  post: Post
}

const PostCard = ({ post }: Props) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/posts/${post.id}`)
  }

  return (
    <Card
      className="w-96 hover:scale-105 transition-transform hover:cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content.substring(0, 100)}...</p>
      </CardContent>
      <CardFooter>
        <p>
          <AuthorName author={post.author} /> -{" "}
          {new Intl.DateTimeFormat("fr-FR").format(new Date(post.createdAt))}
        </p>
      </CardFooter>
    </Card>
  )
}
export default PostCard
