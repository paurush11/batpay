import React from 'react'
import { ContextButtons } from './ContextButtons';
import { TrustedBy } from './TrustedBy';
import { Tagline } from './Tagline';

const LandingPage = () => {
    return (
        <main className='flex flex-col justify-center items-center'>
            {/* Tagline */}
            <Tagline />
            {/* Buttons */}
            <ContextButtons />
            {/* Trusted By */}
            <TrustedBy />
        </main>
    )
}

export default LandingPage
