import { Button } from '@repo/ui'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa'

const EmailMe = () => {
    return (
        <div className="col-span-2 pt-0 md:pt-2">
            <div className="flex justify-between items-center ">
                <Button variant={"ghost"} className='gap-4'>
                    <p className="font-bold uppercase">Need Code! Contact Me</p>
                    <FaEnvelope />
                </Button>
            </div>

            <p className="flex text-gray-500 text-justify p-4 ">
                No need for any payment, send me an email and I will send you the code along with the project idea. BatPay is a simulated net banking system designed to demonstrate how online transactions work using dummy money. This project utilizes webhooks and Prisma for PostgreSQL to create a secure and efficient environment for managing transactions.
            </p>
        </div>
    )
}

export default EmailMe
