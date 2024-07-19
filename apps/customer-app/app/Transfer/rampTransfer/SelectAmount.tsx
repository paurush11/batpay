"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button, Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, Input, Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    toast,
    ToastAction
} from '@repo/ui';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { createOnRampTransaction } from '../../actions/onRampTransaction';
import { RAMPTransactionFormSchema, TProvider } from "@repo/zodTypes";

interface SelectAmountProps {
    setProvider: React.Dispatch<React.SetStateAction<string>>
}

export const SelectAmount: React.FC<SelectAmountProps> = ({ setProvider }) => {
    const form = useForm<z.infer<typeof RAMPTransactionFormSchema>>({
        resolver: zodResolver(RAMPTransactionFormSchema),
        defaultValues: {
            provider: "Select Options",
            amount: 0,
        },
    })
    const [amountFieldValue, setAmountFieldValue] = useState(0);
    async function onSubmit(data: z.infer<typeof RAMPTransactionFormSchema>) {
        let err = false;
        if (!data.amount || data.amount === 0) {
            form.setError("amount", { message: "Amount must be at least 1" });
            err = true;
        }
        if (data.provider === "Select Options") {
            form.setError("provider", { message: "Please select a valid provider" });
            err = true;
        }
        if (err) {
            return;
        }
        const dataToSend = {
            amount: data.amount * 100,
            provider: data.provider as TProvider,
        }

        const response = await createOnRampTransaction(dataToSend.amount, dataToSend.provider);

        if (response.error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: `${response.error}`,
                action: <ToastAction altText="Try again" onClick={() => {
                    setTimeout(() => {
                        form.reset();
                    }, 500)
                }}
                > Try again</ToastAction >,
            })
        } else {
            const url = response.url;
            if (url) {
                window.open(url, "_blank")
            }
            toast({
                title: "Success",
                description: "Transaction Processing",
                variant: "primary",
            })
        }

        form.reset();

    }
    function onError(errors: any) {
        console.log(errors)
    }
    const amountField = (
        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            {...field}
                            type="text"
                            placeholder="10"
                            value={amountFieldValue}
                            onChange={(e) => {
                                if (e.target.value == "") {
                                    field.onChange(0);
                                    setAmountFieldValue(0)
                                    return;
                                } else {
                                    field.onChange(parseInt(e.target.value));
                                    setAmountFieldValue(parseInt(e.target.value));
                                }
                            }}
                        />
                    </FormControl>
                    <FormDescription>
                        Enter your amount for payment
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    const providerField = (
        <FormField
            key={1}
            control={form.control}
            name="provider"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Bank Provider</FormLabel>
                    <Select
                        onValueChange={(e) => {
                            field.onChange(e);
                        }}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your provider" className=' text-start' />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Select Options" disabled>Select Option</SelectItem>
                            <SelectItem value="HDFC">HDFC Bank</SelectItem>
                            <SelectItem value="CHASE">Chase Bank</SelectItem>
                            <SelectItem value="BANK_OF_AMERICA">Bank Of America</SelectItem>
                            <SelectItem value="ICICI">ICICI</SelectItem>
                            <SelectItem value="GOLDMAN_SACHS">Goldman Sachs</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
    return (
        <div className="flex justify-center items-center flex-none max-w-[350px]">
            <Form {...form}>
                <form
                    onReset={(e) => {
                        e.preventDefault();
                        form.clearErrors();
                        form.setValue("provider", "Select Options")
                        setAmountFieldValue(0);
                    }}
                    onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col lg:p-10 md:p-8 sm: p-6 flex-1 gap-4 bg-primary-foreground rounded-md">
                    {providerField}
                    {amountField}
                    <Button type="reset" >Clear</Button>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </div>
    );
}