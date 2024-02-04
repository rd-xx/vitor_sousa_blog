import { twc } from "react-twc"

export const Card = twc.div`rounded-lg border shadow-sm p-6 space-y-8`
export const CardHeader = twc.div`flex flex-col space-y-1.5`
export const CardTitle = twc.h3`text-3xl font-bold leading-none tracking-tight text-center`
export const CardDescription = twc.p`text-sm text-muted-foreground`
export const CardContent = twc.div`space-y-4`
export const CardFooter = twc.div`flex items-center`
