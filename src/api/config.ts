import knexfile from "@@/knexfile"

import env from "@/env.mjs"

const config = {
  db: knexfile,
  security: {
    jwt: {
      secret: env.SECURITY_JWT_SECRET,
      expiresIn: "2 days",
    },
  },
}

export default config
