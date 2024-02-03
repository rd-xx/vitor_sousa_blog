import { z } from "zod"

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().min(5).max(100).default(10),
})

export type PaginationSchema = z.infer<typeof paginationSchema>
