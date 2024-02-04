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

const UsernameField = <T extends FieldValues>({ control }: Props<T>) => (
  <FormField
    control={control}
    name={"username" as Path<T>}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{"Nom d'utilisateur"}</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
      </FormItem>
    )}
  />
)

export default UsernameField
