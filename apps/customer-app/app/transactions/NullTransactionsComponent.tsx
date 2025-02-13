import React from 'react'

const NullTransactionsComponent = ({ errors }: {
    errors: string
}) => {
    return (
        <div className="flex bg-primary-foreground h-full size-full flex-col flex-1 min-h-screen p-10">
            Sorry No Transactions Found! {errors}
        </div>
    )
}

export default NullTransactionsComponent
