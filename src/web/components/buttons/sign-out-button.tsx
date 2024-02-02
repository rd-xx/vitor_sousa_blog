import { useMutation } from "@tanstack/react-query"

import { Button } from "@/web/components/generics/button"
import { useSession } from "@/web/contexts/session-context"
import { api } from "@/web/services/api"

const SignOutButton = () => {
  const { signOut } = useSession()
  const { mutateAsync } = useMutation({
    mutationFn: api.users.signOut,
  })
  const handleClick = async () => {
    await mutateAsync()
    signOut()
  }

  return (
    <Button className="px-0" variant="link" onClick={handleClick}>
      Déconnexion
    </Button>
  )
}

export default SignOutButton
