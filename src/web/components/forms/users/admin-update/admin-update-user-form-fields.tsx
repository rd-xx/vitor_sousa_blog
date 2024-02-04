import { Control } from "react-hook-form"

import { UpdateUserSchema } from "@/schemas"
import DisabledField from "@/web/components/forms/standalone-fields/disabled-field"
import EmailField from "@/web/components/forms/standalone-fields/email-field"
import RoleField from "@/web/components/forms/standalone-fields/role-field"
import UsernameField from "@/web/components/forms/standalone-fields/username-field"

type Props = {
  control: Control<UpdateUserSchema>
}

const AdminUpdateUserFormFields = ({ control }: Props) => (
  <>
    <EmailField control={control} />
    <UsernameField control={control} />
    <RoleField control={control} />
    <DisabledField control={control} />
  </>
)

export default AdminUpdateUserFormFields
