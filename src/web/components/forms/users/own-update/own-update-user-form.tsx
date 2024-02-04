"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { omit } from "radash"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { UpdateUserSchema, updateUserSchema } from "@/schemas"
import { MinimalUser } from "@/types"
import OwnUpdateUserFormFields from "@/web/components/forms/users/own-update/own-update-user-form-fields"
import { Form } from "@/web/components/generics/form"
import { api } from "@/web/services/api"

type Props = {
  user: MinimalUser
}

const OwnUpdateUserForm = ({ user }: Props) => {
  const { mutate } = useMutation({
    mutationFn: api.users.update(user.id),
  })
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: omit(user, ["id"]),
  })
  const onSubmit: SubmitHandler<UpdateUserSchema> = (values) => {
    mutate(values)
    toast.success("Profil mis à jour")
  }

  return (
    <Form {...form}>
      <form
        id="update-user"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <OwnUpdateUserFormFields control={form.control} />
      </form>
    </Form>
  )
}

export default OwnUpdateUserForm
