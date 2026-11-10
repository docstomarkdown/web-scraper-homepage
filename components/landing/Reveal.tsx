"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Slides content up a little once when it scrolls into view. It never changes opacity, so the text is visible in the
 * page before any script runs, for readers and for search engines alike. Renders statically for reduced-motion users.
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
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </MotionTag>
    );
}
