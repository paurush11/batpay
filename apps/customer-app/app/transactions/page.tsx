import React from 'react'
import { TransactionComponent } from './TransactionComponent'
import { fetchTransactions } from '../actions/fetchTransactions';
import NullTransactionsComponent from './NullTransactionsComponent';
interface IUser {
    email: string,
    number: string
}

export interface IonRampTransactionsTable {
    id: string,
    amount: number,
    startTime: Date,
    status: string,
    user: IUser
}

export interface IP2PTransactionTable {
    id: string,
    amount: number,
    startTime: string,
    status: string,
    fromUser: IUser,
    toUser: IUser
}
export default async function Transactions() {
    let errors = "";
    const response = await fetchTransactions();
    if (response.error) errors = response.error;
    if (response.data) {
        const { onRampTransactions, toP2PTransactions, fromP2PTransactions } = response.data
        const myfromP2PTransactions: IP2PTransactionTable[] = fromP2PTransactions.map((transaction) => {
            return {
                id: transaction.id,
                amount: transaction.amount,
                startTime: transaction.startTime.toDateString(),
                status: transaction.status,
                fromUser: {
                    email: transaction.fromUser.email,
                    number: transaction.fromUser.number
                } as IUser,
                toUser: {
                    email: transaction.toUser.email,
                    number: transaction.toUser.number
                } as IUser,
            } as IP2PTransactionTable
        })
        const myToP2PTransactions: IP2PTransactionTable[] = toP2PTransactions.map((transaction) => {
            return {
                id: transaction.id,
                amount: transaction.amount,
                startTime: transaction.startTime.toDateString(),
                status: transaction.status,
                fromUser: {
                    email: transaction.fromUser.email,
                    number: transaction.fromUser.number
                } as IUser,
                toUser: {
                    email: transaction.toUser.email,
                    number: transaction.toUser.number
                } as IUser,
            } as IP2PTransactionTable
        })
        const myOnRampTransactions: IonRampTransactionsTable[] = onRampTransactions.map((transaction) => {
            return {
                id: transaction.id,
                amount: transaction.amount,
                status: transaction.status,
                user: {
                    email: transaction.user.email,
                    number: transaction.user.number
                } as IUser
            } as IonRampTransactionsTable
        })
        return (
            <div className=' min-h-screen'>
                <TransactionComponent fromP2PTransactions={myfromP2PTransactions} toP2PTransactions={myToP2PTransactions} rampTransactions={myOnRampTransactions} />
            </div>
        )
    } else {
        return <NullTransactionsComponent errors={errors} />
    }

}


