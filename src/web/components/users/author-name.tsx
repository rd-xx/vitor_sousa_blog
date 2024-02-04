import Link from "next/link"
import { tv } from "tailwind-variants"

import { MinimalUser } from "@/types"

const authorName = tv({
  base: "text-primary font-medium px-2 py-1 -ml-2 rounded-lg hover:bg-neutral-200 transition-colors",
})

type Props = {
  author: MinimalUser
  className?: string
}

const AuthorName = ({ author, className }: Props) => (
  <Link
    href={`/users/${author.username}`}
    className={authorName({ className })}
  >
    {author.username}
  </Link>
)

export default AuthorName
