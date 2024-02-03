import { pbkdf2, randomBytes } from "node:crypto"
import { promisify } from "node:util"
import jsonwebtoken from "jsonwebtoken"

import config from "@/api/config"
import UserModel from "@/db/models/UserModel"

const hashPassword = async (
  password: string,
  salt = randomBytes(128).toString("hex"),
) => {
  const pbkdf2Async = promisify(pbkdf2)
  const rawHash = await pbkdf2Async(password, salt, 1_000_000, 256, "sha512")
  const hash = rawHash.toString("hex")

  return { hash, salt }
}
const signToken = (user: UserModel) => {
  const jwt = jsonwebtoken.sign(
    {
      payload: {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    },
    config.security.jwt.secret,
    { expiresIn: config.security.jwt.expiresIn },
  )
  const cookieJwt = jsonwebtoken.sign(
    { payload: jwt },
    config.security.jwt.secret,
    { expiresIn: config.security.jwt.expiresIn },
  )

  return { jwt, cookieJwt }
}

export const UserService = {
  hashPassword,
  signToken,
}
