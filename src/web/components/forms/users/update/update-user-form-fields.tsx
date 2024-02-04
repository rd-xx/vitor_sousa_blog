import { Control } from "react-hook-form"

import { UpdateUserSchema } from "@/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/web/components/generics/form"
import { Input } from "@/web/components/generics/input"

type Props = {
  control: Control<UpdateUserSchema>
}

const UpdateUserFormFields = ({ control }: Props) => (
  <>
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{"Nom d'utilisateur"}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  </>
)

export default UpdateUserFormFields
