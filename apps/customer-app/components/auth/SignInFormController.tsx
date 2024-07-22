import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, Input, toast, ToastAction } from "@repo/ui"
import { LoginFormSchema } from "@repo/zodTypes"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { z } from "zod"
import { errors, errorTypes, formatPhoneNumber, handleChange, onError } from "./Constants"
import { customErrorMessage } from "./CustomConstants"

const SignInFormController = ({ isLoading, setIsLoading, signingIn }: {
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  signingIn: boolean,
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {

    const response = await signIn("credentials", { ...values, redirect: false });
    if (response?.error) {

      const errorMessage = response.error as errorTypes;

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${errors[errorMessage]}`,
        action: <ToastAction altText="Try again" onClick={() => {
          setTimeout(() => {
            form.handleSubmit(onSubmit, onError)();
          }, 500)

        }}>Try again</ToastAction>,
      })
    } else {
      router.replace("/");
    }
  }

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      password: "",
      phone: "",
    },
  });



  React.useEffect(() => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setPhoneNumber(formattedPhoneNumber);
    form.setValue("phone", formattedPhoneNumber)
  }, [phoneNumber])


  const phoneField = (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              type="text"
              placeholder="xxx-xxx-xxxx"
              disabled={isLoading}
              value={phoneNumber}
              onChange={(e) => {
                handleChange(e, setPhoneNumber);
                field.onChange(phoneNumber);
              }}

            />
          </FormControl>
        </FormItem>
      )}
    />
  );
  const passwordField = (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex bg-transparent gap-0">
              <Input
                className="p-4 focus-visible:ring-0 border-r-0 border-input rounded-e-none"
                {...field}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                hidden
                disabled={isLoading}
                autoComplete="current password"
              />
              <Button variant={"ghost"} type="button" className="bg-background ring-offset-background border-input  border border-l-0 rounded-l-none" onClick={() => {

                setIsPasswordVisible(!isPasswordVisible)
              }}>
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>

          </FormControl>
        </FormItem>
      )}
    />
  );

  if (signingIn)
    return (
      <Form {...form} >
        <form onSubmit={
          form.handleSubmit(onSubmit, onError)
        } className="flex flex-col gap-4">
          {phoneField}
          {form.getFieldState("phone").error && customErrorMessage(form.getFieldState("phone").error?.message!)}
          {passwordField}
          {form.getFieldState("password").error && customErrorMessage(form.getFieldState("password").error?.message!)}
          <Button disabled={isLoading} type="submit" className="flex"> Sign In with Phone Number</Button>
        </form>
      </Form>
    )
  else return (
    <div className="flex"></div>
  )
}

export default SignInFormController
