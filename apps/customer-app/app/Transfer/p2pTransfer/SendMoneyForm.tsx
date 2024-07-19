"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { P2PTransferFormSchema } from "@repo/zodTypes"
import { z } from 'zod';
import { toast, ToastAction } from "@repo/ui"
const SendMoneyForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof P2PTransferFormSchema>>({
        resolver: zodResolver(P2PTransferFormSchema),
    });
    const onSubmit = async (values: z.infer<typeof P2PTransferFormSchema>) => {
        setIsLoading(true);
        try {
            // Handle the form submission logic
            toast({
                title: "Success",
                variant: "primary",
                description: "Transaction initiated successfully",
            });
        } catch (e) {
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
        <div>

        </div>
    )
}

export default SendMoneyForm
