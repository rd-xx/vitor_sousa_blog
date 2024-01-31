import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const label = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
})

export const Label = ({ className, ...props }: ComponentProps<"label">) => (
  <label className={label({ className })} {...props} />
)
