"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

import { SignInFormFields } from "@/components/forms/sign-in/sign-in-form-fields"
import { Button } from "@/components/generics/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/generics/card"
import { Form } from "@/components/generics/form"
import { SignInSchema, signInSchema } from "@/lib/schemas"

const Page = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit: SubmitHandler<SignInSchema> = (values) => {
    console.log(values)
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
            <Button type="submit">Connexion</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default Page
