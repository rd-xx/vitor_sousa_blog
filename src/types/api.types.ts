import createContext from "@/api/utils/createContext"

export type ApiContext = ReturnType<typeof createContext>

export type ApiMiddleware =
  | ((ctx: ApiContext) => Promise<unknown>)
  | ((ctx: ApiContext) => unknown)

export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}

export type JwtPayload = {
  user: {
    id: string
    username: string
    role: "USER" | "AUTHOR" | "ADMIN"
  }
}

export type ApiResponse<T, M> = { result: T; meta: M }
