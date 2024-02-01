"use client"

import { useSession } from "@/web/contexts/session-context"

const Page = () => {
  const { session } = useSession()

  console.log(session)

  return <div>azerty</div>
}

export default Page
