import { z } from "zod"

export const getPostsSchema = z.object({
  authorId: z.coerce.string().uuid().optional(),
})

export const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
})

export const updatePostSchema = createPostSchema

export type GetPostsSchema = z.infer<typeof getPostsSchema>
export type CreatePostSchema = z.infer<typeof createPostSchema>
export type UpdatePostSchema = z.infer<typeof updatePostSchema>
