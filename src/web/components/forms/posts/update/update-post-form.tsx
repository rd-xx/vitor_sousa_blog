"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { pick } from "radash"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { CreatePostSchema, createPostSchema } from "@/schemas"
import { Post } from "@/types"
import CreatePostFormFields from "@/web/components/forms/posts/create/create-post-form-fields"
import { Form } from "@/web/components/generics/form"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

type Props = {
  post: Post
}

const UpdatePostForm = ({ post }: Props) => {
  const { mutate } = useMutation({
    mutationFn: api.posts.update(post.id),
    onSuccess: () => {
      toast.success("Post mis à jour !")
    },
    onError: handleHttpError(),
  })
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: pick(post, ["title", "content"]),
  })
  const onSubmit: SubmitHandler<CreatePostSchema> = (values) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        id="update-post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CreatePostFormFields control={form.control} />
      </form>
    </Form>
  )
}

export default UpdatePostForm
