import { z } from "zod"

import { roles } from "@/schemas"

export type Role = z.infer<typeof roles>

export type MinimalUser = {
  id: string
  email: string
  username: string
  role: Role
}

export type User = MinimalUser & {
  disabled: boolean
}
