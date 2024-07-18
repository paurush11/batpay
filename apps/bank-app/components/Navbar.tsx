
"use client"
import React from 'react'
import ThemeToggler from './theme-toggler';

export const Navbar: React.FC = () => {
    return (
        <div className="flex p-6 justify-end size-full bg-primary">
            <ThemeToggler />
        </div>
    );
}