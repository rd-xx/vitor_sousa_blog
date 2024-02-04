"use client"

import Link from "next/link"

import SignOutButton from "@/web/components/buttons/sign-out-button"
import { Button } from "@/web/components/generics/button"
import Role from "@/web/components/utils/role/client"
import { useSession } from "@/web/contexts/session-context"

const NavbarActions = () => {
  const { session } = useSession()

  if (!session) {
    return (
      <div className="flex items-center gap-6">
        <Button className="px-0" variant="link" asChild>
          <Link href="/auth/sign-in">Se connecter</Link>
        </Button>
        <Button className="px-0" variant="link" asChild>
          <Link href="/auth/sign-up">Créer un compte</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-6">
      <Button className="px-0" variant="link" asChild>
        <Link href="/profile">Profil</Link>
      </Button>
      <Role minimum="AUTHOR">
        <Button className="px-0" variant="link" asChild>
          <Link href="/posts/new">Nouveau post</Link>
        </Button>
      </Role>
      <Role minimum="ADMIN">
        <Button className="px-0" variant="link" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </Role>
      <SignOutButton />
    </div>
  )
}

export default NavbarActions
