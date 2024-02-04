import { z } from "zod"

import { roles } from "@/schemas"

export type Role = z.infer<typeof roles>

export type MinimalUser = {
  id: string
  username: string
  role: Role
}

export type User = MinimalUser & {
  email: string
}
