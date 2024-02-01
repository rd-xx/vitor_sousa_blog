import { Control } from "react-hook-form"

import { SignInSchema } from "@/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/web/components/generics/form"
import { Input } from "@/web/components/generics/input"

type Props = {
  control: Control<SignInSchema>
}

export const SignInFormFields = ({ control }: Props) => (
  <>
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input placeholder="test@gmail.com" {...field} />
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  </>
)
