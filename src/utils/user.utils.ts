import { rolesArray } from "@/schemas"
import { JwtPayload, Role } from "@/types"

const hasPermission = (session: JwtPayload, minimumRequiredRole: Role) =>
  rolesArray.indexOf(minimumRequiredRole) <=
  rolesArray.indexOf(session.user.role)

export const UserUtils = {
  hasPermission,
}
