import React from "react"

const customErrorMessage = (message: string) => {
    return (
        <p className="text-red-500 text-sm">{message}</p>
    )
}

export {
    customErrorMessage
}