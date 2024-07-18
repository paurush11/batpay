"use client";
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '../components/theme-provider';

interface ProvidersProps {
    children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange >
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}

export default Providers;