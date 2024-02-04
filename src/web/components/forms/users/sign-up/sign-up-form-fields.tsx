import { Control } from "react-hook-form"

import { SignUpSchema } from "@/schemas"
import EmailField from "@/web/components/forms/standalone-fields/email-field"
import PasswordField from "@/web/components/forms/standalone-fields/password-field"
import UsernameField from "@/web/components/forms/standalone-fields/username-field"

type Props = {
  control: Control<SignUpSchema>
}

const SignUpFormFields = ({ control }: Props) => (
  <>
    <EmailField control={control} />
    <UsernameField control={control} />
    <PasswordField control={control} />
  </>
)

export default SignUpFormFields
