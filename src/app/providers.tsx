"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

import { LayoutProps } from "@/types"
import { SessionContextProvider } from "@/web/contexts/session-context"

const Providers = ({ children }: LayoutProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton position="top-right" />
      <SessionContextProvider>{children}</SessionContextProvider>
    </QueryClientProvider>
  )
}

export default Providers
