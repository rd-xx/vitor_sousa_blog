import validateMiddleware from "@/lib/api/middlewares/validate.middleware"
import mw from "@/lib/api/mw"
import { signUpSchema } from "@/lib/schemas"

export const POST = mw([
  validateMiddleware({ body: signUpSchema }),
  ({ send }) => send("Hello, world!"),
])
