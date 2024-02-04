import { Control } from "react-hook-form"

import { CreatePostSchema, UpdatePostSchema } from "@/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/web/components/generics/form"
import { Input } from "@/web/components/generics/input"
import { Textarea } from "@/web/components/generics/textarea"

type Props = {
  control: Control<CreatePostSchema | UpdatePostSchema>
}

const CreatePostFormFields = ({ control }: Props) => (
  <>
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Titre</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contenu</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)

export default CreatePostFormFields
