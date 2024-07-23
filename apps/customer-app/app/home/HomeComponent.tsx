"use client"
import {
    toast
} from '@repo/ui'
import { useCallback, useEffect, useState } from 'react'
import { addMyBalance } from '../../actions/addBalance'
import { useBankStore } from '../../store/balanceStore'
import HomeView from './HomeView'


const HomeComponent = ({
    userId,
}: {
    userId: string

}) => {
    const { fetchBalance, unlockedBalance } = useBankStore()
    useEffect(() => {
        fetchBalance(userId);
        setMyBalance(unlockedBalance);
    }, [userId, unlockedBalance])

    const [myBalance, setMyBalance] = useState<number>(0);
    const [currentButton, setCurrentButton] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [myCustomTopUp, setMyCustomTopUp] = useState<number>(0);
    const [inputValue, setInputValue] = useState('');

    const reset = () => {
        setLoading(false);
        setCurrentButton(0);
        setMyCustomTopUp(0);
        setInputValue('');
    }

    const addFundsToMyAccount = useCallback(async () => {
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
    }, [myCustomTopUp, loading, reset])

    return (
        <HomeView
            setCurrentButton={setCurrentButton}
            setInputValue={setInputValue}
            setLoading={setLoading}
            setMyBalance={setMyBalance}
            setMyCustomTopUp={setMyCustomTopUp}
            loading={loading}
            currentButton={currentButton}
            inputValue={inputValue}
            myBalance={myBalance}
            myCustomTopUp={myCustomTopUp}
            addFundsToMyAccount={addFundsToMyAccount}
        />
    )
}

export default HomeComponent
