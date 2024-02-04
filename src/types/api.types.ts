import createContext from "@/api/utils/createContext"
import { MinimalUser } from "@/types"

export type ApiContext = ReturnType<typeof createContext>

export type ApiMiddleware =
  | ((ctx: ApiContext) => Promise<unknown>)
  | ((ctx: ApiContext) => unknown)

export type CookieJwt = {
  iat: number
  exp: number
  payload: string
}

export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}

export type JwtPayload = {
  user: MinimalUser
}

export type ApiResponse<T, M> = { result: T; meta: M }
