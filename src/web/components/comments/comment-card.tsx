import { Comment } from "@/types"
import { Card, CardContent } from "@/web/components/generics/card"
import AuthorName from "@/web/components/users/author-name"

type Props = {
  comment: Comment
}

const CommentCard = ({ comment }: Props) => (
  <div className="flex flex-col gap-1">
    <div>
      <div className="ml-2">
        <AuthorName author={comment.author} />
      </div>
    </div>
    <Card>
      <CardContent>
        <p>{comment.content}</p>
      </CardContent>
    </Card>
  </div>
)

export default CommentCard
