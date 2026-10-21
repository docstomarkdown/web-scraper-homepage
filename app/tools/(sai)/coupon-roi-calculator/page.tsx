import { Metadata } from "next"
import { CouponROICalculator } from "./_components/CouponROICalculator"
import { CouponROIGuide } from "./_components/CouponROIGuide"
import { CouponROIHowToUse } from "./_components/CouponROIHowToUse"
import { CouponROIOverview } from "./_components/CouponROIOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Coupon ROI Calculator: Free Profit from a Discount Campaign",
    description: "Enter a coupon campaign's cost, redemptions, order value, discount and margin to see revenue, profit after discounts and goods, and the ROI.",
    alternates: { canonical: "/tools/coupon-roi-calculator" },
}
export default function CouponROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Coupon ROI Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <CouponROICalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>
                        <CouponROIOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CouponROIHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CouponROIGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                    {
                                        question: "How do I calculate coupon ROI?",
                                        answer: "Work out the profit the redeemed orders made after the discount and the cost of goods, subtract the campaign cost, and divide by the campaign cost. $1,380 of profit on a $300 campaign is a 460% ROI."
                                    },
                                    {
                                        question: "What is a good coupon redemption rate?",
                                        answer: "For emails to existing customers, 5% to 15% is common; for printed or ad coupons, under 2% is normal. The example here redeems 12% of 1,000 coupons."
                                    },
                                    {
                                        question: "Does the discount count as a cost?",
                                        answer: "Yes. It's revenue you gave up on each order, so the calculator subtracts it from gross revenue before working out profit."
                                    },
                                    {
                                        question: "What margin should I enter?",
                                        answer: "Your gross margin before the campaign: the share of the order price left after the cost of the goods. A $60 order with $36 of goods has a 40% margin."
                                    },
                                    {
                                        question: "Why can ROI be high while profit is small?",
                                        answer: "ROI is relative to the campaign cost. A cheap campaign with modest profit shows a high percentage; look at the profit figure as well before scaling up."
                                    },
                                    {
                                        question: "Is this calculator free?",
                                        answer: "Yes. It runs in your browser, needs no sign-up and stores nothing you type."
                                    }
                                ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
