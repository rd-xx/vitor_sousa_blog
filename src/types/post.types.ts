import { MinimalUser } from "@/types"

export type Post = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  content: string
  tags: string[]
  views: number
  authorId: string
  author: MinimalUser
}
