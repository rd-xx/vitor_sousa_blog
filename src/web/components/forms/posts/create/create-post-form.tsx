"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import { CreatePostSchema, createPostSchema } from "@/schemas"
import CreatePostFormFields from "@/web/components/forms/posts/create/create-post-form-fields"
import { Button } from "@/web/components/generics/button"
import { Form } from "@/web/components/generics/form"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

const CreatePostForm = () => {
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: api.posts.create,
  })
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })
  const onSubmit: SubmitHandler<CreatePostSchema> = (values) => {
    mutate(values, {
      onSuccess: (post) => {
        router.push(`/posts/${post.data.result[0].id}`)
      },
      onError: handleHttpError(),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CreatePostFormFields control={form.control} />
        <Button className="w-24 self-end" type="submit">
          Créer
        </Button>
      </form>
    </Form>
  )
}

export default CreatePostForm
