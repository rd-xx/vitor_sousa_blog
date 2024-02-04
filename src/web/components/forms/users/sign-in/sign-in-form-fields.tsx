import { Control } from "react-hook-form"

import { SignInSchema } from "@/schemas"
import EmailField from "@/web/components/forms/standalone-fields/email-field"
import PasswordField from "@/web/components/forms/standalone-fields/password-field"

type Props = {
  control: Control<SignInSchema>
}

const SignInFormFields = ({ control }: Props) => (
  <>
    <EmailField control={control} />
    <PasswordField control={control} />
  </>
)

export default SignInFormFields
