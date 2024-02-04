import { Control } from "react-hook-form"

import { UpdateUserSchema } from "@/schemas"
import EmailField from "@/web/components/forms/standalone-fields/email-field"
import UsernameField from "@/web/components/forms/standalone-fields/username-field"

type Props = {
  control: Control<UpdateUserSchema>
}

const OwnUpdateUserFormFields = ({ control }: Props) => (
  <>
    <EmailField control={control} />
    <UsernameField control={control} />
  </>
)

export default OwnUpdateUserFormFields
