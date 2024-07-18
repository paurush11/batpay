import React from 'react'
import { ThemeProvider } from '../components/theme-provider';

interface providersProps {
    children: React.ReactNode
}

const Providers: React.FC<providersProps> = ({ children }) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange >
            {children}
        </ThemeProvider>
    );
}
export default Providers;