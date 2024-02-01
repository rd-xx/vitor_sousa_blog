"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

import { SignInSchema, signInSchema } from "@/schemas"
import { SignInFormFields } from "@/web/components/forms/sign-in/sign-in-form-fields"
import { Button } from "@/web/components/generics/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/generics/card"
import { Form } from "@/web/components/generics/form"
import { useSession } from "@/web/contexts/session-context"
import { api } from "@/web/services/api"
import handleHttpError from "@/web/utils/handleHttpError"

const Page = () => {
  const router = useRouter()
  const { signIn } = useSession()
  const { mutate, isPending } = useMutation({
    mutationFn: api.users.signIn,
  })
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<SignInSchema> = (values) => {
    mutate(values, {
      onSuccess: ({ data }) => {
        const [{ jwt }] = data.result

        signIn(jwt)
        router.push("/")
      },
      onError: handleHttpError({ 401: "E-mail ou mot de passe incorrects." }),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInFormFields control={form.control} />
          </CardContent>
          <CardFooter className="justify-end">
            <Button asChild variant="link">
              <Link href="#">Mot de passe oublié ?</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              Connexion
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default Page
