import { forwardRef, HTMLAttributes } from "react"
import { cnBase as cn } from "tailwind-variants"

import { twx } from "@/web/utils/twx"

export const Table = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

export const TableHeader = twx.thead`[&_tr]:border-b bg-muted`
export const TableBody = twx.tbody`[&_tr:last-child]:border-0`
export const TableFooter = twx.tfoot`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`
export const TableRow = twx.tr`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted even:bg-muted`
export const TableHead = twx.th`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0`
export const TableCell = twx.td`p-4 align-middle [&:has([role=checkbox])]:pr-0`
export const TableCaption = twx.caption`mt-4 text-sm text-muted-foreground`
