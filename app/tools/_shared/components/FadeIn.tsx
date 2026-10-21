"use client"
import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right" | "none"
}
/** Fades a block in once when it scrolls into view. Renders statically for reduced-motion users. */
export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = "up",
}: FadeInProps) {
    const reduceMotion = useReducedMotion()
    if (reduceMotion) return <div className={cn("w-full", className)}>{children}</div>
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    }
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: "easeOut",
            }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    )
}
