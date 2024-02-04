"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowUp } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { tv } from "tailwind-variants"

import { CreateCommentSchema, createCommentSchema } from "@/schemas"
import { CommentUtils } from "@/utils"
import CreateCommentFormFields from "@/web/components/forms/comments/create/create-comment-form-fields"
import { Button } from "@/web/components/generics/button"
import { Form } from "@/web/components/generics/form"
import { useSession } from "@/web/contexts/session-context"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

const createCommentForm = tv({
  base: "flex gap-6",
})

type Props = {
  postId: string
  className?: string
}

const CreateCommentForm = ({ postId, className }: Props) => {
  const queryClient = useQueryClient()
  const queryKey = ["comments", postId]
  const { session } = useSession()
  const { mutate } = useMutation({
    mutationKey: ["addComment"],
    mutationFn: api.comments.create,
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey })
      const previousComments = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(
        queryKey,
        CommentUtils.mergeComments(values, session!),
      )

      return { previousComments }
    },
    onSuccess: () => {
      form.reset()
    },
    onError: (error, _, context) => {
      handleHttpError()(error)

      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
  const form = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { content: "" },
  })
  const onSubmit: SubmitHandler<CreateCommentSchema> = (values) => {
    mutate({ ...values, postId })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={createCommentForm({ className })}
      >
        <CreateCommentFormFields control={form.control} />
        <Button>
          <ArrowUp size={24} />
        </Button>
      </form>
    </Form>
  )
}

export default CreateCommentForm
