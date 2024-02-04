import { twx } from "@/web/utils/twx"

export const Card = twx.div`rounded-lg border shadow-sm p-6 space-y-8`
export const CardHeader = twx.div`flex flex-col space-y-1.5`
export const CardTitle = twx.h3`text-3xl font-bold leading-none tracking-tight text-center`
export const CardDescription = twx.p`text-sm text-muted-foreground`
export const CardContent = twx.div`space-y-4`
export const CardFooter = twx.div`flex items-center`
