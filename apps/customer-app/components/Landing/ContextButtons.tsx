import { Button } from '@repo/ui';
import React from 'react'


export const ContextButtons: React.FC = () => {
    return (
        <div className="flex justify-center gap-4">
            <Button className='p-4 rounded-xl' variant={"themeBlue"}>Join Us</Button>
            <Button className='p-4 rounded-xl' variant={"themeBlue"}>See more</Button>
        </div>
    );
}