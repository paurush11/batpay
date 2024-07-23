"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormMessage, GradualSpacing, Input, toast, ToastAction } from "@repo/ui";
import { P2PTransferFormSchema } from "@repo/zodTypes";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { handleChange, onError } from '../../../components/auth/Constants';
import { createNewP2PTransaction } from '../../../actions/p2pTransaction';
const SendMoneyForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof P2PTransferFormSchema>>({
        resolver: zodResolver(P2PTransferFormSchema),
        defaultValues: {
            amount: 0,
            email: '',
            phone: '',
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
                    <FormMessage >
                        {form.getFieldState("phone").error?.message!}
                    </FormMessage>
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
                        <div className="flex  gap-0">
                            <Input
                                {...field}
                                type={"email"}
                                placeholder="Email"
                                disabled={isLoading}
                                autoComplete="current email"
                            />
                        </div>

                    </FormControl>
                    <FormMessage >
                        {form.getFieldState("email").error?.message!}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
    const amountField = (
        <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="flex bg-transparent gap-0">
                            <Input
                                {...field}
                                type={"number"}
                                placeholder="amount"
                                disabled={isLoading}
                                autoComplete="Choose amount"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        const amountToBeAdded = parseInt(e.target.value);
                                        if (!isNaN(amountToBeAdded)) {
                                            field.onChange(amountToBeAdded);
                                        }
                                    }
                                }}
                            />
                        </div>

                    </FormControl>
                    <FormMessage >
                        {form.getFieldState("amount").error?.message!}
                    </FormMessage>
                </FormItem>
            )}
        />
    );

    const onSubmit = async (values: z.infer<typeof P2PTransferFormSchema>) => {
        setIsLoading(true);
        try {
            const data = {
                amount: values.amount,
                ...(values.email ? { email: values.email } : { phone: values.phone })
            }
            const response = await createNewP2PTransaction(data);
            console.log(response);
            if (response?.error) {
                throw new Error(response.error);
            } else {
                form.reset();
                setPhoneNumber("");
                toast({
                    title: "Success",
                    variant: "primary",
                    description: "Transaction initiated successfully",
                });
            }
            // Handle the form submission logic

        } catch (e) {
            console.log(e);
            toast({
                title: "Error",
                variant: "destructive",
                description: `${e}`,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='flex flex-col flex-1 rounded-lg gap-8'>
            <GradualSpacing text='P2P Transaction' className='lg:text-7xl max-lg:text-7xl max-md:text-4xl max-sm:text-2xl' />
            <div className='flex w-full justify-center gap-8 max-md:flex-col flex-1'>
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        onReset={(e) => {
                            e.preventDefault();
                            form.clearErrors();
                            form.reset({
                                amount: 0,
                                phone: "",
                                email: "",
                            });
                            setPhoneNumber("");

                        }}
                        className='flex flex-col lg:min-w-96 min-w-60 bg-primary-foreground p-10 rounded-lg gap-4 justify-center' >
                        {emailField}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>
                        {phoneField}
                        {amountField}
                        <Button type="reset" className="btn btn-primary">Clear</Button>
                        <Button type="submit" className="btn btn-primary">Send</Button>
                    </form>
                </Form >
                <Card className=' flex flex-col lg:min-w-96 min-w-60 items-center opacity-50 hover:opacity-100 p-10 min-h-96'>
                    <CardHeader>
                        <CardTitle className='flex justify-center'>Coming Soon</CardTitle>
                        <CardDescription>Do P2P Transfers</CardDescription>
                    </CardHeader>
                    <CardContent className='grid grid-cols-2 gap-8'>
                        <div className="flex p-10 bg-gray-200 rounded">1</div>
                        <div className="flex p-10  bg-gray-200 rounded">2</div>
                        <div className="flex p-10  bg-gray-200 rounded">3</div>
                        <div className="flex p-10  bg-gray-200 rounded">4</div>
                    </CardContent>

                </Card>
            </div >
        </div>
    )
}

export default SendMoneyForm
