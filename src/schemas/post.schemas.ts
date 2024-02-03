import { z } from "zod"

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().min(5).max(100).default(10),
})

export const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
})

export type PaginationSchema = z.infer<typeof paginationSchema>
export type CreatePostSchema = z.infer<typeof createPostSchema>
