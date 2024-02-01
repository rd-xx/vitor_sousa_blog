import knex from "knex"
import { NextRequest } from "next/server"

import BaseModel from "@/db/models/BaseModel"
import config from "@/lib/api/utils/config"

const createContext = (req: NextRequest) => {
  const send = (result: unknown, meta: Record<string, unknown> = {}) =>
    Response.json({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  const db = knex(config.db)

  BaseModel.knex(db)

  return {
    req,
    send,
    input: {},
    db,
    models: {},
  }
}

export default createContext
