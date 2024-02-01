import { twc } from "react-twc"
import { tv } from "tailwind-variants"

const input = tv({
  base: "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
})

export const Input = twc.input(() => input())
