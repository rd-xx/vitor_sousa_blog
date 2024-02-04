"use client"

import { useMutation } from "@tanstack/react-query"

import { User } from "@/types"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

type Props = {
  user: User
}

const DeleteUserForm = ({ user }: Props) => {
  const { mutate } = useMutation({
    mutationFn: api.users.delete(user.id),
    onError: handleHttpError(),
  })
  const handleSubmit = () => {
    mutate()
  }

  return <form id="delete-user" onSubmit={handleSubmit} className="space-y-6" />
}

export default DeleteUserForm
