"use client"

import Link from "next/link"

import { Button } from "@/web/components/generics/button"
import { useSession } from "@/web/contexts/session-context"

const NavbarActions = () => {
  const { session } = useSession()

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
    <div className="flex items-center">
      <Button className="px-0" variant="link" asChild>
        Sign out
      </Button>
    </div>
  )
}

export default NavbarActions
