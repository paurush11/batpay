"use client"
import { TProvider, TProviders } from '@repo/zodTypes'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { cn } from '../../lib/utils'
import { Button, GradualSpacing, MagicCard } from '@repo/ui'

interface ChooseProvidersProps {
    provider: string
}

export const ChooseProviders: React.FC<ChooseProvidersProps> = ({ provider }) => {
    const fadingAnimation = "animate-fade-up"
    const scaleAnimation = "animate-scale-250"
    const jumpAnimation = "animate-jump-out"
    const [editedClassName, setEditedClassName] = useState("")
    const [selectedClassName, setSelectedClassName] = useState("")
    const [wait, setWait] = useState(false)
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
    const formatProviderName = (provider: TProvider): string => {
        return provider
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    useEffect(() => {
        if (provider !== "none") {
            const timer = setTimeout(() => {
                setEditedClassName(fadingAnimation + " hidden")
                setSelectedClassName("hidden " + fadingAnimation)
                setWait(true)
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [provider])
    return (
        <div className={cn({
            'grid grid-cols-2 gap-4 items-center justify-center': isSmallScreen && !wait,
            'flex lg:flex-col gap-4 items-center justify-center': !isSmallScreen
        })}
            style={{
                flex: wait ? '0 0 40%' : '0 0 30%',
            }}>
            {TProviders.map(prov => {
                if (provider !== prov)
                    return (<div key={prov} className={cn("flex flex-col size-full", editedClassName)} style={{
                        maxHeight: "150px"
                    }}>
                        <MagicCard className='justify-center items-center' gradientColor='#D9D9D955'>
                            {formatProviderName(prov)}
                        </MagicCard>
                    </div>);
                else
                    return (<div key={prov} className={cn("flex flex-col size-full", selectedClassName)} style={{
                        maxHeight: "300px"
                    }}>
                        <MagicCard className='justify-center items-center' gradientColor='#D9D9D955'>
                            {formatProviderName(prov)}
                        </MagicCard>
                    </div>);
            })}
            {provider !== "none" && wait && <div className='flex flex-col justify-center items-center bg-primary-foreground rounded-md p-10 max-md:p-4 ' style={{
                minHeight: "250px"
            }}>
                <div className='p-4'>
                    <GradualSpacing text={provider} className='font-display text-center text-2xl font-thin '></GradualSpacing>
                </div>
                <div className='text-sm font-bold bg-primary-foreground p-4 rounded-md border-t-2'>
                    <GradualSpacing text="is processing your request, please wait" className='font-display text-center text-sm font-thin tracking-[-0.1em]'></GradualSpacing>
                </div>
                <div className="flex">
                    <Button>See My Transactions</Button>
                </div>
            </div>}

        </div>
    );
}