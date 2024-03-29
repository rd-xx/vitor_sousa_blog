import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const signUpSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z.string().min(3),
  password: z.string().min(6),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>

export type SignInApiResponse = [{ jwt: string }]
