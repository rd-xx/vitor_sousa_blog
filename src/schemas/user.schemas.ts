import { z } from "zod"

export const roles = z.enum(["USER", "AUTHOR", "ADMIN"])
export const rolesArray = Object.values(roles.Values)

export const updateUserSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    username: z.string().min(3),
    role: roles,
  })
  .partial()
  .strict()

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
