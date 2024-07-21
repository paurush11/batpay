"use client"
import {
    Button, TextRevealByWord, Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    toast,
    Input,
} from '@repo/ui'
import React, { useEffect, useState } from 'react'
import { addMyBalance, computeBalanceForUser } from '../actions/addBalance'


const HomeComponent = ({
    userId
}: {
    userId: string
}) => {
    const text = 'With BatPay, Your Payments Just Got Better – Faster, Safer, and More Convenient Than Ever!'
    const [myBalance, setMyBalance] = React.useState(0)
    const [currentButton, setCurrentButton] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [myCustomTopUp, setMyCustomTopUp] = useState<number>(0);
    const [inputValue, setInputValue] = useState('');
    const customerMyBalance = async () => {
        try {
            const balance = await computeBalanceForUser(userId);
            console.log(balance)
            if (balance) {
                setMyBalance(balance.unLockedBalance)
            }
        } catch (e) {
            setMyBalance(0);
        }
    }
    const reset = () => {
        setLoading(false);
        setCurrentButton(0);
        setMyCustomTopUp(0);
        setInputValue('');
    }

    const addFundsToMyAccount = async () => {
        setLoading(true);
        try {
           
            const addBalanceResponse = await addMyBalance(myCustomTopUp);

            if (addBalanceResponse && addBalanceResponse.data) {
                toast({
                    title: "Success",
                    description: "Funds added successfully",
                })
                setMyBalance(addBalanceResponse.data);
                reset()

            } else if (addBalanceResponse.error) {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                })
                reset()
            }
        } catch (e) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            })
            reset()
        }
    }
    useEffect(() => {
        customerMyBalance();
    }, [userId, myBalance])
    return (
        <div className="flex flex-col items-center justify-start">
            <div className="flex ">
                <TextRevealByWord text={text} />
            </div>
            <div className="flex size-full lg:p-20 p-10 justify-center gap-8">
                <Card className=' flex flex-col lg:min-w-96 min-w-60 items-center opacity-50 hover:opacity-100 p-10 min-h-96'>
                    <CardHeader>
                        <CardTitle className='flex justify-center'>Your Balance</CardTitle>
                        <CardDescription>Check your current balance</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center justify-center gap-2'>
                        <p className="text-2xl font-bold pb-4">${myBalance}</p>
                        <p className="text-sm text-gray-500">Add Funds</p>
                        <div className="flex gap-2 py-4">
                            <Button disabled={loading} variant={currentButton === 1 ? "themeGreen" : "themePurple"} onClick={() => {
                                setCurrentButton((val) => {
                                    if (val === 1) return 0;
                                    else {
                                        setMyCustomTopUp(10);
                                        return 1;
                                    }
                                })
                            }}>$10</Button>
                            <Button disabled={loading} variant={currentButton === 2 ? "themeGreen" : "themePurple"} onClick={() => {
                                setCurrentButton((val) => {
                                    if (val === 2) return 0;
                                    else {
                                        setMyCustomTopUp(15);
                                        return 2;
                                    }
                                })
                            }}>$15</Button>
                            <Button disabled={loading} variant={currentButton === 3 ? "themeGreen" : "themePurple"} onClick={() => {
                                setCurrentButton((val) => {
                                    if (val === 3) return 0;
                                    else {
                                        setMyCustomTopUp(20);
                                        return 3;
                                    }
                                })
                            }}>$20</Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or Choose a Custom Amount
                                </span>
                            </div>
                        </div>
                        <div className="flex">
                            <Input type="number" placeholder='Amount' disabled={loading}
                                value={inputValue}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        const amountToBeAdded = parseInt(e.target.value);
                                        if (!isNaN(amountToBeAdded)) {
                                            setMyCustomTopUp(amountToBeAdded);
                                            setCurrentButton(0);
                                        }
                                    }
                                    setInputValue(e.target.value);
                                }}></Input>
                        </div>
                    </CardContent>
                    <CardFooter className=' justify-center items-center'>
                        <Button disabled={loading}
                            onClick={() => {
                                addFundsToMyAccount();
                            }}>Add Funds</Button>
                    </CardFooter>
                </Card>
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
            </div>
        </div>
    )
}

export default HomeComponent
