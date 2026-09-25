"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Fades content up once when it scrolls into view. Renders statically for reduced-motion users. */
export default function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();
    if (reduceMotion) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
