"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@repo/ui/lib/utils";

export interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    ref?: React.RefObject<HTMLDivElement>
}
// const headingFont = M_PLUS_Rounded_1c({
//     weight: "700",
//     subsets: ["latin"],
//     display: "swap",
// })
export function MagicCard({
    children,
    className = "",
    gradientSize = 200,
    gradientColor = "#262626",
    ref
}: MagicCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    return (
        <div
            ref={ref}
            onMouseMove={(e) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();

                mouseX.set(e.clientX - left);
                mouseY.set(e.clientY - top);
            }}
            className={cn(
                className,
                "group relative font-sans flex size-full rounded-xl bg-[#1e6091] dark:bg-[#8EA8C3] border text-white dark:text-black lg:text-xl sm:text-sm  p-4 md:text-base text-center",

            )}
        >
            <div className="relative">{children}</div>
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
						radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
					`,
                }}
            />
        </div>
    );
}
