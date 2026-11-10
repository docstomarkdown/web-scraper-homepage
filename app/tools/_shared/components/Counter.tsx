"use client"
import { useEffect } from "react"
import { useMotionValue, useTransform, motion, animate, useReducedMotion } from "framer-motion"
interface CounterProps {
    value: number
    formatter?: (value: number) => string
    className?: string
    prefix?: string
    suffix?: string
}
export function Counter({ value, formatter, className, prefix = "", suffix = "" }: CounterProps) {
    const motionValue = useMotionValue(value)
    const reduceMotion = useReducedMotion()
    useEffect(() => {
        if (reduceMotion) {
            motionValue.set(value)
            return
        }
        const controls = animate(motionValue, value, {
            duration: 0.5,
            ease: "easeOut"
        })
        return controls.stop
    }, [value, motionValue, reduceMotion])
    const displayValue = useTransform(motionValue, (latest) => {
        if (formatter) {
            return formatter(latest)
        }
        // Up to two decimals: 3.5 units stays 3.5 (it used to round to 4).
        return latest.toLocaleString(undefined, { maximumFractionDigits: 2 })
    })
    return (
        <span className={className}>
            {prefix}<motion.span>{displayValue}</motion.span>{suffix}
        </span>
    )
}
