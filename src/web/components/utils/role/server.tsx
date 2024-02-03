import getSession from "@/api/utils/getSession"
import { Role } from "@/types"
import { UserUtils } from "@/utils"
import { ReactNode } from "react"

type Props = {
  minimum: Role
  children: ReactNode
}
const Role = ({minimum,children}: Props) => {
  const session = getSession()  

  if (!session || !UserUtils.hasPermission(session, minimum)) {
    return null
  }

  return children
}

export default Role
