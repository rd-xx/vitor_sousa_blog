"use client"

import { useQuery } from "@tanstack/react-query"

import CommentCard from "@/web/components/comments/comment-card"
import CommentsInstableWarning from "@/web/components/comments/comments-instable-warning"
import CreateCommentForm from "@/web/components/forms/comments/create/create-comment-form"
import { useSession } from "@/web/contexts/session-context"
import { api } from "@/web/services/api"

type Props = {
  postId: string
}

const CommentsShowcase = ({ postId }: Props) => {
  const { session } = useSession()
  const { data, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => api.comments.getByPostId(postId),
  })
  const comments = data?.data.result

  if (isLoading || !comments) {
    return (
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Comments</h3>
        <p>En cours de chargement...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-medium">Comments</h3>
      {session && <CommentsInstableWarning />}
      {session && <CreateCommentForm className="mb-8" postId={postId} />}
      <div className="space-y-6">
        {comments.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}
      </div>
    </div>
  )
}

export default CommentsShowcase
