'use client';
import { Button } from '@repo/ui';
import { useTheme } from 'next-themes'
import { SunDimIcon, Moon } from 'lucide-react';
import React from 'react'

const ThemeToggler = () => {
    const { setTheme, theme } = useTheme();
    return (
        <Button
            variant={"secondary"}
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light")
            }}
        >
            {theme === "light" ? <Moon className='h-4 w-4' /> : <SunDimIcon className='h-4 w-4' />}
        </Button>
    )
}

export default ThemeToggler
