import { Control, FieldValues, Path } from "react-hook-form"

import { rolesArray } from "@/schemas"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/web/components/generics/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/web/components/generics/select"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const RoleField = <T extends FieldValues>({ control }: Props<T>) => (
  <FormField
    control={control}
    name={"role" as Path<T>}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Rôle</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={field.value} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {rolesArray.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
)

export default RoleField
