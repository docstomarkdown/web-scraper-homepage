import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { PalletConfigurationCalculator } from "./_components/PalletConfigurationCalculator"
import { PalletHowToUse } from "./_components/PalletHowToUse"
import { PalletGuide } from "./_components/PalletGuide"
import { PalletOverview } from "./_components/PalletOverview"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: "Pallet Configuration Calculator: Free Cartons per Pallet",
    description: "Find how many cartons fit on a standard or custom pallet, how many per layer and how many layers, within a height and weight limit.",
    alternates: { canonical: "/tools/pallet-configuration-calculator" },
}

export default function PalletConfigurationCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Pallet Configuration Calculator" />
                <div className="mb-20">
                    <PalletConfigurationCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={Lightbulb}
                        />
                        <PalletOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PalletHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <PalletGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How many cartons fit on a pallet?",
                                    answer: "Divide the pallet's length and width by the carton's, keep whole numbers and multiply for cartons per layer, then multiply by the layers that fit under the height limit. A 12 by 8 by 6 inch carton on a 48 by 40 pallet at 72 inches is 220.",
                                },
                                {
                                    question: "What is the standard pallet size?",
                                    answer: "48 by 40 inches in North America (GMA). Europe uses 1200 by 800 mm (EUR) and 1200 by 1000 mm. The calculator has presets for each.",
                                },
                                {
                                    question: "Why is 5.5 inches taken off the height?",
                                    answer: "That's the pallet's own thickness. The stack limit your carrier gives usually includes it.",
                                },
                                {
                                    question: "What does area efficiency mean?",
                                    answer: "The share of the pallet's top surface the bottom layer covers. Under 85% means a different carton size or orientation might fit more.",
                                },
                                {
                                    question: "Does it handle a weight limit?",
                                    answer: "Yes. Enter the carton weight and the pallet limit, and the total cartons and layers are reduced to stay under it.",
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
