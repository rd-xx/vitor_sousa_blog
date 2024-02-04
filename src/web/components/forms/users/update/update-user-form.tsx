"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { omit } from "radash"
import { SubmitHandler, useForm } from "react-hook-form"

import { UpdateUserSchema, updateUserSchema } from "@/schemas"
import { User } from "@/types"
import UpdateUserFormFields from "@/web/components/forms/users/update/update-user-form-fields"
import { Form } from "@/web/components/generics/form"
import { api } from "@/web/services/api"

type Props = {
  user: User
}

const UpdateUserForm = ({ user }: Props) => {
  const { mutate } = useMutation({
    mutationFn: api.users.update(user.id),
  })
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: omit(user, ["id"]),
  })
  const onSubmit: SubmitHandler<UpdateUserSchema> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        id="update-user"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <UpdateUserFormFields control={form.control} />
      </form>
    </Form>
  )
}

export default UpdateUserForm
