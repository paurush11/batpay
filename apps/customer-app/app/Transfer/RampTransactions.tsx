"use client"
import React, { useState } from 'react'
import { SelectAmount } from './SelectAmount';
import { ChooseProviders } from './ChooseProviders';

const RampTransactions = () => {
    const [provider, setProvider] = useState("none");
    return (
        <div className="flex flex-1 bg-border justify-between p-10  gap-4 max-lg:flex-col max-lg:items-center max-lg:p-4 max-lg:justify-center min-h-screen "
            style={{
                borderRadius: "40px",
            }}>

            <SelectAmount setProvider={setProvider} />
            <ChooseProviders provider={provider} />
        </div>
    )
}

export default RampTransactions
