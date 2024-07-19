"use client";
import React from 'react';

interface TransactionComponentProps {
    rampTransactions: []
    fromP2PTransactions: []
    toP2PTransactions: []
}
interface IonRampTransactionsTable {
    amount: number,
    startTime: Date,
    status: string
}

export const TransactionComponent: React.FC<TransactionComponentProps> = ({ fromP2PTransactions, toP2PTransactions, rampTransactions }) => {

    console.log(rampTransactions)
    console.log(fromP2PTransactions)
    console.log(toP2PTransactions)
    return (
        <div className="flex bg-primary-foreground h-full size-full flex-col flex-1 min-h-screen p-10">
            TransactionComponent
        </div>
    );
}