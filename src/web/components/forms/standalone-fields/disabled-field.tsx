import { Control, FieldValues, Path } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/web/components/generics/form"
import { Switch } from "@/web/components/generics/switch"

type Props<T extends FieldValues> = {
  control: Control<T>
}

const DisabledField = <T extends FieldValues>({ control }: Props<T>) => (
  <FormField
    control={control}
    name={"disabled" as Path<T>}
    render={({ field }) => (
      <FormItem className="flex justify-between items-center space-y-0">
        <FormLabel>Compte désactivé</FormLabel>
        <FormControl>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    )}
  />
)

export default DisabledField
