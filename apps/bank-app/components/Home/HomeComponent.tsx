"use client"
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, GradualSpacing, toast } from '@repo/ui';
import { useEffect, useState } from 'react';
// import { processPayment } from './action/processPayment';
import { cn } from '@repo/ui/lib/utils';
import axios from 'axios';

const HomeComponent = ({
    amount, token
}: {
    amount: number, token: string
}) => {
    const [error, setError] = useState("")
    const [done, setDone] = useState(false)
    const [value, setValue] = useState(0);
    const [loaderClassName, setLoaderClassName] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("Processing payment...")
    const [isClient, setIsClient] = useState(false);

    const processPaymentResponse = async () => {
        // const response = await processPayment(amount, token);
        // if (response?.error) {
        //     setError(response.error)
        //     setPaymentStatus("Payment failed")
        // } else {
        //     setDone(true)
        //     setPaymentStatus("Payment successful")

        // }
    }
    useEffect(() => {
        setIsClient(true);
        const handleIncrement = (prev: number) => {
            if (prev >= 100) {
                setLoaderClassName("hidden");
                return 100;
            }
            if (prev === 0) prev = 1
            const increment = Math.ceil(prev * 0.5); // Exponential increment
            return Math.min(prev + increment, 100);
        };

        setValue(0);
        const interval = setInterval(() => {
            setValue((prev) => handleIncrement(prev));
        }, 500); // Adjust the interval time as needed for smoother animation

        if (value >= 100) {
            setLoaderClassName("hidden");
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    });

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
                    <Card className='p-4 flex-col   border-4 border-primary shadow-lg shadow-primary '>
                        <CardHeader>
                            <CardTitle>Complete your payment</CardTitle>
                            <CardDescription>Complete your payment with just one click</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!done &&
                                <div className="flex gap-4 border-[#885053] border-2 p-2 dark:bg-[#885053] rounded-md text-2xl
                                ">
                                    <div className="flex"> Amount:</div>
                                    <div className="flex">${amount}</div>

                                </div>
                            }
                            {error && <div className="text-red-500">{error}</div>}
                            {done && (
                                <div className={cn("flex flex-col items-center mt-4", loaderClassName)}>
                                    {/* <AnimatedCircularProgressBar max={100} value={Math.floor(value)} min={0} gaugePrimaryColor="rgb(79 70 229)"
                                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)" /> */}
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
                            <Button variant="destructive">Cancel</Button>
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
