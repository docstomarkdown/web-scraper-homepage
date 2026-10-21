"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fades content up once when it scrolls into view. Renders statically for reduced-motion users.
 * Inside a `<ul>`/`<ol>`, pass `as="li"` so the list keeps `li` as its direct children: a wrapper `div`
 * between the list and its items makes screen readers announce the items as loose text.
 */
export default function Reveal({
    children,
    delay = 0,
    className,
    as = "div",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: "div" | "li";
}) {
    const reduceMotion = useReducedMotion();
    const Tag = as;
    const MotionTag = as === "li" ? motion.li : motion.div;
    if (reduceMotion) return <Tag className={className}>{children}</Tag>;
    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </MotionTag>
    );
}
