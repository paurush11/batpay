import React from 'react'

const HomeComponentNoPayment = ({
    message
}: {
    message: string
}) => {
    return (
        <div className="flex size-full  flex-1 flex-col justify-center items-center p-10" style={{ minHeight: "90vh" }}>
            <div className="flex bg-secondary size-full flex-1 justify-center items-center p-10 rounded-md">
                {message}
            </div>
        </div>
    )
}

export default HomeComponentNoPayment
