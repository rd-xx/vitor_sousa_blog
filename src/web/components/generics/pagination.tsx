import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { twc } from "react-twc"
import { tv } from "tailwind-variants"

import { button, ButtonProps } from "@/web/components/generics/button"

const pagination = tv({
  slots: {
    base: "mx-auto flex w-full justify-center",
    content: "flex flex-row items-center gap-1",
    item: "",
    link: "",
    previous: "gap-1 pl-2.5",
    next: "gap-1 pr-2.5",
    ellipsis: "flex h-9 w-9 items-center justify-center",
    icon: "h-4 w-4",
  },
})

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>

export const Pagination = twc.nav.attrs({
  role: "navigation",
  "aria-label": "pagination",
})(() => pagination().base())
export const PaginationContent = twc.ul(() => pagination().content())
export const PaginationItem = twc.li(() => pagination().item())
export const PaginationLink = twc.a.attrs<PaginationLinkProps>({
  role: "link",
})(({ isActive, size }) =>
  pagination().link([
    button({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
  ]),
)

export const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={pagination().previous({ className })}
    {...props}
  >
    <ChevronLeft className={pagination().icon()} />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

export const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={pagination().next({ className })}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className={pagination().icon()} />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span aria-hidden className={pagination().ellipsis({ className })} {...props}>
    <MoreHorizontal className={pagination().icon()} />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"
