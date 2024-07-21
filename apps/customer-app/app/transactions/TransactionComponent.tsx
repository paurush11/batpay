"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui';
import React from 'react';
import { IonRampTransactionsTable, IP2PTransactionTable } from './page';

interface TransactionComponentProps {
    rampTransactions: IonRampTransactionsTable[]
    fromP2PTransactions: IP2PTransactionTable[]
    toP2PTransactions: IP2PTransactionTable[]
}


const getStatusColor = (status: string): string => {
    switch (status) {
        case 'COMPLETED':
            return 'green';
        case 'PENDING':
            return 'purple';
        case 'PROCESSING':
            return 'blue';
        case 'FAILED':
        case 'CANCELLED':
            return 'red';
        default:
            return 'gray';
    }
}

const TransactionTable: React.FC<{ title: string, transactions: IP2PTransactionTable[] | IonRampTransactionsTable[], type: string }> = ({ title, transactions, type }) => (
    <>

        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <table className="min-w-full border-collapse  max-md:hidden">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Amount</th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Start Time</th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">Status</th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">User Email</th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">User Number</th>
                        {type !== 'onRamp' && (
                            <>
                                <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">From User</th>

                            </>
                        )}
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {transactions.map((transaction, index) => (
                        <tr key={index} className="bg-white border border-gray-300 md:border-none block md:table-row">
                            <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{transaction.amount}</td>
                            <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IP2PTransactionTable).startTime}</td>
                            <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell" style={{ color: getStatusColor(transaction.status) }}>{transaction.status}</td>
                            {type !== 'onRamp' && (
                                <>
                                    <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IP2PTransactionTable).toUser.email}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IP2PTransactionTable).toUser.number}</td>
                                </>
                            )}
                            {type === 'onRamp' && (
                                <>
                                    <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IonRampTransactionsTable).user.email}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IonRampTransactionsTable).user.number}</td>
                                </>
                            )}

                            {type !== 'onRamp' && (
                                <>
                                    <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">{(transaction as IP2PTransactionTable).fromUser.email}</td>

                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="block md:hidden">
            {transactions.map((transaction, index) => (
                <TransactionCard key={index} transaction={transaction} type={type} title={title} />
            ))}
        </div>
    </>
);

const TransactionCard: React.FC<{ transaction: IonRampTransactionsTable | IP2PTransactionTable, type: string, title: string }> = ({ transaction, type, title }) => (
    <Card className="mb-4">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>ID: {transaction.id}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="font-semibold">Amount:</div>
                    <div>{transaction.amount}</div>
                </div>
                {type !== 'onRamp' && <div className="flex justify-between">
                    <div className="font-semibold">Start Time:</div>
                    <div>{(transaction as IP2PTransactionTable).startTime}</div>
                </div>}

                <div className="flex justify-between" style={{ color: getStatusColor(transaction.status) }}>
                    <div className="font-semibold">Status:</div>
                    <div>{transaction.status}</div>
                </div>
                {type === 'onRamp' ? (
                    <>
                        <div className="flex justify-between">
                            <div className="font-semibold">User Email:</div>
                            <div>{(transaction as IonRampTransactionsTable).user.email}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="font-semibold">User Number:</div>
                            <div>{(transaction as IonRampTransactionsTable).user.number}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between">
                            <div className="font-semibold">To User:</div>
                            <div>{(transaction as IP2PTransactionTable).toUser.email}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="font-semibold">To User Number:</div>
                            <div>{(transaction as IP2PTransactionTable).toUser.number}</div>
                        </div>

                    </>
                )}
            </div>
        </CardContent>
        <CardFooter>
            {/* Any footer content if needed */}
        </CardFooter>
    </Card>
);

export const TransactionComponent: React.FC<TransactionComponentProps> = ({ fromP2PTransactions, toP2PTransactions, rampTransactions }) => {

    return (
        <div className="flex bg-primary-foreground h-full size-full flex-col flex-1 min-h-screen p-10 text-ring">
            <h1 className="text-2xl font-bold mb-4">Transaction Overview</h1>
            {rampTransactions && rampTransactions.length > 0 && <TransactionTable title="On Ramp Transactions" transactions={rampTransactions} type="onRamp" />}
            {fromP2PTransactions && fromP2PTransactions.length > 0 && <TransactionTable title="From P2P Transactions" transactions={fromP2PTransactions} type="p2p" />}
            {toP2PTransactions && toP2PTransactions.length > 0 && <TransactionTable title="To P2P Transactions" transactions={toP2PTransactions} type="p2p" />}
        </div>
    );
}