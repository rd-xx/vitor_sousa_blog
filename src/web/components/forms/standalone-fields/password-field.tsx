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

const PasswordField = <T extends FieldValues>({ control }: Props<T>) => (
  <FormField
    control={control}
    name={"password" as Path<T>}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Mot de passe</FormLabel>
        <FormControl>
          <Input type="password" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
)

export default PasswordField
