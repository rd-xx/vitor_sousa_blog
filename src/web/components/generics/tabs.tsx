"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"

import { twx } from "@/web/utils/twx"

export const Tabs = TabsPrimitive.Root
export const TabsList = twx(
  TabsPrimitive.List,
)`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground`
export const TabsTrigger = twx(
  TabsPrimitive.Trigger,
)`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`
export const TabsContent = twx(
  TabsPrimitive.Content,
)`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`
