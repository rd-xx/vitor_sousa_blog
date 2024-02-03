import { ZodError, ZodSchema } from "zod"

import { HttpArgumentsError } from "@/api/utils/errors"
import { ApiMiddleware } from "@/types"

type ValidateMiddleware = { query?: ZodSchema; body?: ZodSchema }

const validateMiddleware =
  (opts: ValidateMiddleware): ApiMiddleware =>
  async ({ req, input }) => {
    const { query: querySchema, body: bodySchema } = opts

    try {
      const query = req.nextUrl.searchParams
      const sanitizedQuery = querySchema ? querySchema.parse(query) : {}
      Object.assign(input, sanitizedQuery)

      if (["POST", "PUT"].includes(req.method)) {
        const body = await req.json()
        const sanitizedBody = bodySchema ? bodySchema.parse(body) : {}

        Object.assign(input, sanitizedBody)
      }
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
