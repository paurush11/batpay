"use client"
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, GradualSpacing, toast } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { cancelPayment, processPayment } from '../../actions/processPayment';


const HomeComponent = ({
    amount, token
}: {
    amount: number, token: string
}) => {
    const [error, setError] = useState("")
    const [done, setDone] = useState(false)
    const [loaderClassName, setLoaderClassName] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("Processing payment...")

    const processPaymentResponse = async () => {
        const response = await processPayment(amount, token);
        if (response?.error) {
            setError(response.error)
            setPaymentStatus("Payment failed")
        } else {
            setDone(true)
            setPaymentStatus("Payment successful")
            setLoaderClassName("hidden")
        }
    }
    const cancelPaymentResponse = async () => {
        const response = await cancelPayment(token);
        if (response?.error) {
            setError(response.error)
            setPaymentStatus("Payment Cancellation failed")
        } else {
            setDone(true)
            setPaymentStatus("Payment Cancellation successful")
        }
    }

    useEffect(() => {
        if (error) {
            setDone(false)
            toast({
                title: "Error",
                description: `${error}`,
                variant: "destructive",
            })
        }
    }, [error])

    return (
        <div className="flex size-full bg-primary-foreground flex-1 flex-col justify-center items-center p-10 " style={{ minHeight: "90vh" }}>
            <div className="flex bg-secondary size-full flex-1 justify-center items-center p-20 rounded-md">
                <div className="flex p-10 justify-center  rounded-md items-center gap-2 flex-col">
                    <Card className='p-4 flex-col bg-card border-4 border-primary shadow-lg shadow-primary '>
                        <CardHeader>
                            <CardTitle>Complete your payment</CardTitle>
                            <CardDescription>Complete your payment with just one click</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!done &&
                                <div className="flex  rounded-md text-2xl justify-center">
                                    <div className="flex"> Amount:</div>
                                    <div className=" ml-auto flex">${amount / 100}</div>

                                </div>
                            }
                            {done && (
                                <div className={cn("flex flex-col items-center mt-4", loaderClassName)}>
                                    <GradualSpacing
                                        className="font-display text-center text-2xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-xl md:leading-[5rem]"
                                        text={paymentStatus}
                                    />
                                </div>
                            )}
                            {done && (
                                <div className="flex flex-col items-center mt-4">
                                    <p className="text-green-500">Payment completed successfully!</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="destructive" onClick={async () => {
                                await cancelPaymentResponse();
                            }}>Cancel</Button>
                            <Button variant={"themeGreen"} onClick={async () => {
                                await processPaymentResponse();
                            }}>Pay</Button>
                        </CardFooter>

                    </Card>


                </div>

            </div>
        </div>
    )
}

export default HomeComponent
