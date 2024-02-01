import { AxiosError } from "axios"
import { toast } from "sonner"
import { z } from "zod"

const errorSchema = z.object({
  error: z.object({
    message: z.string(),
  }),
})
const handleHttpError =
  (errMapping: Record<number, string> = {}) =>
  (error: Error) => {
    if (
      !(error instanceof AxiosError) ||
      !error.response ||
      !errorSchema.safeParse(error.response.data).success
    ) {
      toast.error("Une erreur inattendue est survenue.")

      return
    }

    const { status } = error.response
    const {
      error: { message },
    } = error.response.data as z.infer<typeof errorSchema>

    if (errMapping[status]) {
      toast.error(errMapping[status])

      return
    }

    toast.error(message)
  }

export default handleHttpError
