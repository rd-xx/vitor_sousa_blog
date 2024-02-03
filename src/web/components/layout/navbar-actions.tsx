import Link from "next/link"

import getSession from "@/api/utils/getSession"
import SignOutButton from "@/web/components/buttons/sign-out-button"
import { Button } from "@/web/components/generics/button"
import Role from "@/web/components/utils/role/server"

const NavbarActions = () => {
  const session = getSession()

  if (!session) {
    return (
      <div className="flex items-center gap-6">
        <Button className="px-0" variant="link" asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
        <Button className="px-0" variant="link" asChild>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-6">
      <Role minimum="AUTHOR">
        <Button className="px-0" variant="link" asChild>
          <Link href="/posts/new">New post</Link>
        </Button>
      </Role>
      <SignOutButton />
    </div>
  )
}

export default NavbarActions
