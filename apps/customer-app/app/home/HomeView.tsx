import { TextRevealByWord, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input, CardFooter } from '@repo/ui';
import React from 'react'


const HomeView = ({
    myBalance,
    loading,
    currentButton,
    inputValue,
    setCurrentButton,
    setMyCustomTopUp,
    setInputValue,
    addFundsToMyAccount
}: {
    inputValue: string
    myBalance: number
    loading: boolean
    myCustomTopUp: number
    currentButton: number
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    setCurrentButton: React.Dispatch<React.SetStateAction<number>>
    setMyCustomTopUp: React.Dispatch<React.SetStateAction<number>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setMyBalance: React.Dispatch<React.SetStateAction<number>>
    addFundsToMyAccount: () => Promise<void>
}) => {
    const text = 'With BatPay, Your Payments Just Got Better – Faster, Safer, and More Convenient Than Ever!'

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

export default HomeView
