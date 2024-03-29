import { Control } from "react-hook-form"

import { CreateCommentSchema } from "@/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/web/components/generics/form"
import { Textarea } from "@/web/components/generics/textarea"

type Props = {
  control: Control<CreateCommentSchema>
}

const CreateCommentFormFields = ({ control }: Props) => (
  <>
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea className="w-full" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)

export default CreateCommentFormFields
