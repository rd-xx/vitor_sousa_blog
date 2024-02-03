"use server"

import { cookies } from "next/headers"

import config from "@/web/config"

const getSessionCookie = () => {
  const jwt = cookies().get(config.security.session.cookie.key)

  if (!jwt) {
    return null
  }

  return jwt.value
}

export default getSessionCookie
