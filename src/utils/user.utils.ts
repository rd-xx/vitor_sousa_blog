import { rolesArray } from "@/schemas"
import { JwtPayload, Role } from "@/types"

const hasPermission = (session: JwtPayload, minimumRequiredRole: Role) =>
  rolesArray.indexOf(session.user.role) <=
  rolesArray.indexOf(minimumRequiredRole)

export const UserUtils = {
  hasPermission,
}
