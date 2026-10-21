import { Metadata } from "next"
import { SKUGenerator } from "./_components/SKUGenerator"
import { SKUHowToUse } from "./_components/SKUHowToUse"
import { SKUGuide } from "./_components/SKUGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "SKU Generator: Free Product Code Builder",
    description: "Build consistent SKU codes from a brand prefix, category, product name and attributes such as colour and size, with a running number and a CSV export.",
    alternates: { canonical: "/tools/sku-generator" },
}

const faqs = [
    {
        question: "How long should a SKU be?",
        answer: "Eight to sixteen characters. Long enough to carry brand, category and variant, short enough to type and read.",
    },
    {
        question: "Should I use letters or only numbers?",
        answer: "Both. Letters make the code readable; numbers give you a running sequence for variants.",
    },
    {
        question: "Why avoid symbols?",
        answer: "Many inventory systems, marketplaces and barcode tools reject or mangle characters such as @, # and /. A hyphen is the safe separator.",
    },
    {
        question: "Can I use the UPC as my SKU?",
        answer: "You can, but a UPC says nothing about the product. A SKU you design tells you the brand, category and variant without looking it up.",
    },
]

export default function SkuGeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="E-commerce SKU Generator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <SKUGenerator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <SKUHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SKUGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ title="Questions, answered" faqs={faqs} />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
