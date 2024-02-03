import { notFound } from "next/navigation"

import getSession from "@/api/utils/getSession"
import { UserUtils } from "@/utils"
import CreatePostForm from "@/web/components/forms/posts/create/create-post-form"

const Page = () => {
  const session = getSession()

  if (!session || !UserUtils.hasPermission(session, "AUTHOR")) {
    return notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Créer un nouveau post</h1>
      <CreatePostForm />
    </div>
  )
}

export default Page
