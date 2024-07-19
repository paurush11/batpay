import React from 'react'
import { TransactionComponent } from './TransactionComponent'
import { fetchTransactions } from '../actions/fetchTransactions';
import NullTransactionsComponent from './NullTransactionsComponent';

const page = async () => {
    let errors = "";
    const response = await fetchTransactions();
    if (response.error) errors = response.error;
    if (response.data) {
        const { onRampTransactions, toP2PTransactions, fromP2PTransactions } = response.data
        return (
            <div className=' min-h-screen'>
                <TransactionComponent fromP2PTransactions={fromP2PTransactions as []} toP2PTransactions={toP2PTransactions as []} rampTransactions={onRampTransactions as []} />
            </div>
        )
    } else {
        return <NullTransactionsComponent />
    }

}

export default page
