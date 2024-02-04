"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { signUpSchema, SignUpSchema } from "@/schemas"
import SignUpFormFields from "@/web/components/forms/users/sign-up/sign-up-form-fields"
import { Button } from "@/web/components/generics/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"
import { Form } from "@/web/components/generics/form"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

const Page = () => {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: api.users.signUp,
    onSuccess: () => {
      toast.success(
        "Votre compte a été créé avec succès. Veuillez vous connecter.",
      )
      router.push("/auth/sign-in")
    },
    onError: handleHttpError(),
  })
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<SignUpSchema> = (values) => {
    mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="sign-up"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <SignUpFormFields control={form.control} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild variant="link">
          <Link href="#">Mot de passe oublié ?</Link>
        </Button>
        <Button type="submit" form="sign-up" disabled={isPending}>
          Créer un compte
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Page
