import { MinimalUser } from "@/types"

export type Comment = {
  id: string
  createdAt: Date
  updatedAt: Date
  content: string
  authorId: string
  postId: string
  author: MinimalUser
}
