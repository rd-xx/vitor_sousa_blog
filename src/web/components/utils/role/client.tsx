import { Role } from "@/types"
import { UserUtils } from "@/utils"
import { useSession } from "@/web/contexts/session-context"
import { ReactNode } from "react"

type Props = {
  minimum: Role
  children: ReactNode
}

const Role = ({minimum,children}: Props) => {
  const {session} = useSession()

  if (!session || !UserUtils.hasPermission(session, minimum)) {
    return null
  }

  return children
}

export default Role
