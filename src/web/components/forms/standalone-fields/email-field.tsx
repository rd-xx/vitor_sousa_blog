import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/web/components/generics/form"
import { Input } from "@/web/components/generics/input"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const EmailField = <T extends FieldValues>({ control }: Props<T>) => (
  <FormField
    control={control}
    name={"email" as Path<T>}
    render={({ field }) => (
      <FormItem>
        <FormLabel>E-mail</FormLabel>
        <FormControl>
          <Input placeholder="test@gmail.com" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
)

export default EmailField
