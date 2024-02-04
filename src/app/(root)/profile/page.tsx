import { notFound } from "next/navigation"

import getSession from "@/api/utils/getSession"
import AuthorPostsShowcase from "@/web/components/posts/author-posts-showcase"
import ProfileCard from "@/web/components/users/profile-card"

const Page = () => {
  const session = getSession()

  if (!session) {
    return notFound()
  }

  return (
    <div className="space-y-16">
      <ProfileCard />
      {session.user.role !== "USER" && (
        <AuthorPostsShowcase userId={session.user.id} />
      )}
    </div>
  )
}

export default Page
