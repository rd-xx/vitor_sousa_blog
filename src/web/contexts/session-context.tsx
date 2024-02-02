"use client"

import jsonwebtoken from "jsonwebtoken"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { JwtPayload, RawJwt } from "@/types"
import config from "@/web/config"

type SessionContextType = {
  session: JwtPayload | null
  signIn: (jwt: string) => void
  signOut: () => void
}

type Props = {
  children: ReactNode
}

export const SessionContext = createContext({} as SessionContextType)
export const useSession = () => useContext(SessionContext)

export const SessionContextProvider = (props: Props) => {
  const [session, setSession] = useState<JwtPayload | null>(null)
  const signIn = useCallback((jwt: string) => {
    localStorage.setItem(config.security.session.cookie.key, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }, [])
  const signOut = useCallback(() => {
    localStorage.removeItem(config.security.session.cookie.key)
    setSession(null)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.session.cookie.key)

    if (!jwt) {
      return
    }

    // We should verify the JWT here, as the user can modify it in localStorage
    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider {...props} value={{ session, signIn, signOut }} />
  )
}
