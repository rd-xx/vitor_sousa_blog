import { JsonWebTokenError } from "jsonwebtoken"
import { NextRequest } from "next/server"
import { NotFoundError } from "objection"

import { HTTP_ERRORS } from "@/api/utils/constants"
import createContext from "@/api/utils/createContext"
import {
  HttpForbiddenError,
  HttpNotFoundError,
  HttpPublicError,
  PublicError,
} from "@/api/utils/errors"
import { ApiMiddleware } from "@/types"

const handleError = (err: unknown) => {
  const error = (() => {
    if (err instanceof JsonWebTokenError) {
      return new HttpForbiddenError()
    }

    if (err instanceof NotFoundError) {
      return new HttpNotFoundError()
    }

    return err
  })()

  if (!(error instanceof PublicError)) {
    return Response.json(
      { error: "Something went wrong." },
      { status: HTTP_ERRORS.INTERNAL_SERVER_ERROR },
    )
  }

  return Response.json(
    { error: { message: error.message } },
    {
      status:
        error instanceof HttpPublicError
          ? error.statusCode
          : HTTP_ERRORS.INTERNAL_SERVER_ERROR,
    },
  )
}
const mw =
  (middlewares: ApiMiddleware[]) =>
  async (
    req: NextRequest,
    opts: { params: Record<string, string> },
  ): Promise<void | Response> => {
    const ctx = createContext(req, opts)

    try {
      for (const middleware of middlewares) {
        // eslint-disable-next-line no-await-in-loop
        const res = await middleware(ctx)

        if (res) {
          return res as Promise<void | Response>
        }
      }

      throw new Error("No response")
    } catch (err) {
      return handleError(err)
    } finally {
      await ctx.db.destroy()
    }
  }

export default mw
