import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { ContainerLoadCalculator } from "./_components/ContainerLoadCalculator"
import { ContainerLoadHowToUse } from "./_components/ContainerLoadHowToUse"
import { ContainerLoadGuide } from "./_components/ContainerLoadGuide"
import { ContainerLoadOverview } from "./_components/ContainerLoadOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Container Load Calculator: Free Cartons per Container",
    description: "Find how many cartons or pallets fit in a 20ft, 40ft or custom container, which way to stack them, and how much of the space you use.",
    alternates: { canonical: "/tools/container-load-calculator" },
    keywords: ["container load calculator", "cargo space optimizer", "shipping calculator", "pallet loading", "20ft container capacity", "40ft container capacity"],
}

export default function ContainerLoadCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <ToolPageTitle
                        title="Container Load Calculator"
                    />
                </FadeIn>

                <div className="mb-20">
                    <ContainerLoadCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="What this calculator does"
                            icon={BookOpen}
                        />
                        <ContainerLoadOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ContainerLoadHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <ContainerLoadGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How many cartons fit in a 20ft container?",
                                    answer: "It depends on the carton. The calculator divides the container's interior along each edge by the carton's size, multiplies the three counts, and checks the weight limit. For a 50 by 40 by 30 cm carton it's 385.",
                                },
                                {
                                    question: "What's the difference between loose and pallet loading?",
                                    answer: "Loose stacks cartons directly, which fits more. Pallet loading fits cartons on a pallet first, then pallets in the container, which fits fewer but unloads faster.",
                                },
                                {
                                    question: "Do I have to enter the carton weight?",
                                    answer: "No. Without it the count is by space alone. With it the calculator also checks the container's weight limit, which often matters for dense goods.",
                                },
                                {
                                    question: "What does space utilisation mean?",
                                    answer: "The share of the container's interior volume your cartons fill. 100% is impossible in practice; 70% to 85% is typical for well-matched cartons.",
                                },
                                {
                                    question: "Which container should I choose?",
                                    answer: "Pick the one your forwarder quoted. A 40ft high cube holds about 76 cubic metres, a 40ft about 67 and a 20ft about 33.",
                                },
                                {
                                    question: "Are the interior sizes exact?",
                                    answer: "They're standard figures. Interiors vary a little by maker, so enter your own container's measurements when you have them.",
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
