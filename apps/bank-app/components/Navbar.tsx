
"use client"
import React from 'react'
import ThemeToggler from './theme-toggler';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
    return (
        <div className="flex p-6 justify-end size-full bg-primary">
            <ThemeToggler />
        </div>
    );
}