"use client"
import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    direction?: "up" | "down" | "left" | "right" | "none"
}
/** Slides a block in once when it scrolls into view. It never changes opacity, so the text is in the page before any
 * script runs, as the site's Reveal does. Renders statically for reduced-motion users. */
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
            x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
        },
        visible: {
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
