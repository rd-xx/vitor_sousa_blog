import knex from "knex"
import { NextRequest } from "next/server"

import config from "@/api/config"
import BaseModel from "@/db/models/BaseModel"
import CommentModel from "@/db/models/CommentModel"
import PostModel from "@/db/models/PostModel"
import UserModel from "@/db/models/UserModel"

const createContext = (req: NextRequest) => {
  const send = (
    result: unknown,
    meta: Record<string, unknown> = {},
    init: Parameters<typeof Response.json>[1] = {},
  ) =>
    Response.json(
      {
        result: Array.isArray(result) ? result : [result],
        meta,
      },
      init,
    )
  const db = knex(config.db)

  BaseModel.knex(db)

  return {
    req,
    send,
    input: {},
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
    },
  }
}

export default createContext
