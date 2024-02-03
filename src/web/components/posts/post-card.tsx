"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Post } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"

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
          <Link
            href={`/users/${post.author.username}`}
            className="text-primary font-medium px-2 py-1 -ml-2 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            {post.author.username}
          </Link>{" "}
          - {new Intl.DateTimeFormat("fr-FR").format(new Date(post.createdAt))}
        </p>
      </CardFooter>
    </Card>
  )
}
export default PostCard
