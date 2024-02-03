import { z } from "zod"

export const roles = z.enum(["USER", "AUTHOR", "ADMIN"])
export const rolesArray = Object.values(roles.Values)
