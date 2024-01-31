import { assign } from "radash"
import { ZodError, ZodSchema } from "zod"

import { HttpArgumentsError } from "@/lib/api/errors"
import { ApiMiddleware } from "@/lib/types"

type ValidateMiddleware = { query?: ZodSchema; body?: ZodSchema }

const validateMiddleware =
  (opts: ValidateMiddleware): ApiMiddleware =>
  ({ req, input }) => {
    const { query: querySchema, body: bodySchema } = opts
    const query = req.nextUrl.searchParams

    try {
      const sanitizedQuery = querySchema ? querySchema.parse(query) : {}
      const sanitizedBody = bodySchema ? bodySchema.parse(req.body) : {}

      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      input = assign(sanitizedQuery, sanitizedBody)
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = Object.entries(err.flatten().fieldErrors).map(
          ([k, v]) => `${k}: ${v?.join(", ")}`,
        )

        // Ideally, we should handle this properly, but it'll do for now
        if (errors.length === 0) {
          throw new HttpArgumentsError(["Either query or body is required."])
        }

        throw new HttpArgumentsError(errors)
      }

      throw err
    }
  }

export default validateMiddleware
