import createContext from "@/lib/api/createContext"

export type ApiContext = ReturnType<typeof createContext>

export type ApiMiddleware =
  | ((ctx: ApiContext) => Promise<unknown>)
  | ((ctx: ApiContext) => unknown)
