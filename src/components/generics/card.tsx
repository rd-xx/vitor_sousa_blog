import { twc, TwcComponentProps } from "react-twc"
import { tv, VariantProps } from "tailwind-variants"

const card = tv({
  slots: {
    base: "rounded-lg border shadow-sm p-6 space-y-8",
    header: "flex flex-col space-y-1.5",
    title: "text-3xl font-bold leading-none tracking-tight text-center",
    description: "text-sm text-muted-foreground",
    content: "space-y-4",
    footer: "flex items-center",
  },
  variants: {
    color: {
      default: {
        base: "bg-content1 text-content1-foreground",
      },
      primary: {
        base: "bg-primary text-primary-foreground",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
})

type CardProps = TwcComponentProps<"div"> & VariantProps<typeof card>

export const Card = twc.div<CardProps>(({ color }) => card({ color }).base())
export const CardHeader = twc.div(() => card().header())
export const CardTitle = twc.h3(() => card().title())
export const CardDescription = twc.p(() => card().description())
export const CardContent = twc.div(() => card().content())
export const CardFooter = twc.div(() => card().footer())
