import { SignUpFormSchema } from '@repo/zodTypes';
import React, { useState } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form, FormControl, FormField, FormItem, Input, toast, ToastAction } from "@repo/ui"
import { useRouter } from 'next/navigation';
import { handleChange, onError } from './Constants';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { customErrorMessage } from "./CustomConstants"
import { signUp } from '../../app/actions/authActions';
import { signIn } from 'next-auth/react';

const SignUpFormController = ({ isLoading, signingIn, setIsLoading }: {
    isLoading: boolean,
    signingIn: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phone: "",
            confirmPassword: "",
        },
    });

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
    const emailField = (
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex bg-transparent gap-0">
                            <Input
                                className="p-4 focus-visible:ring-0 border-r-0 border-input rounded-e-none"
                                {...field}
                                type={"email"}
                                placeholder="email"
                                disabled={isLoading}
                                autoComplete="current email"
                            />
                        </div>

                    </FormControl>
                </FormItem>
            )}
        />
    );
    const nameField = (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex bg-transparent gap-0">
                            <Input
                                className="p-4 focus-visible:ring-0 border-r-0 border-input rounded-e-none"
                                {...field}
                                type={"text"}
                                placeholder="name"
                                disabled={isLoading}
                                autoComplete="your name"
                            />
                        </div>

                    </FormControl>
                </FormItem>
            )}
        />
    );
    const confirmPasswordField = (
        <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex bg-transparent gap-0">
                            <Input
                                className="p-4 focus-visible:ring-0 border-r-0 border-input rounded-e-none"
                                {...field}
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                placeholder="password"
                                hidden
                                disabled={isLoading}
                                autoComplete="confirm password"
                            />
                            <Button variant={"ghost"} type="button" className="bg-background ring-offset-background border-input  border border-l-0 rounded-l-none" onClick={() => {

                                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                            }}>
                                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>

                    </FormControl>
                </FormItem>
            )}
        />
    );

    async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
        setIsLoading(true);
        try {
            const res = await signUp({
                name: values.name,
                phone: values.phone,
                password: values.password,
                email: values.email
            })
            
            if (res) {
                toast({
                    title: "Success",
                    variant: "primary",
                    description: "Account created successfully",
                })
                await signIn("credentials", {
                    phone: values.phone,
                    password: values.password,
                    redirect: false
                })
                router.push("/")
            }
        } catch (e) {
            toast({
                title: "Error",
                variant: "destructive",
                description: `${e}`,
                action: <ToastAction altText="Try again" onClick={() => {
                    setTimeout(() => {
                        form.handleSubmit(onSubmit, onError)();
                    }, 500)
                }}
                > Try again</ToastAction >,
            })
            setIsLoading(false);
        }


    }

    if (!signingIn)
        return (
            <Form {...form}>
                <form onSubmit={
                    form.handleSubmit(onSubmit, onError)
                } className="flex flex-col gap-4">
                    {nameField}
                    {form.getFieldState("name").error && customErrorMessage(form.getFieldState("name").error?.message!)}
                    {emailField}
                    {form.getFieldState("email").error && customErrorMessage(form.getFieldState("email").error?.message!)}
                    {phoneField}
                    {form.getFieldState("phone").error && customErrorMessage(form.getFieldState("phone").error?.message!)}
                    {passwordField}
                    {form.getFieldState("password").error && customErrorMessage(form.getFieldState("password").error?.message!)}
                    {confirmPasswordField}
                    {form.getFieldState("confirmPassword").error && customErrorMessage(form.getFieldState("confirmPassword").error?.message!)}
                    <Button disabled={isLoading} type="submit" className="flex"> Create Account</Button>
                </form>
            </Form>
        )
    else return (
        <div className="flex"> </div>
    )
}

export default SignUpFormController
