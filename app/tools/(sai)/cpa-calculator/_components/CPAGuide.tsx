"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Target, Calculator, MousePointerClick, Scale, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function CPAGuide() {
    return (
        <ToolGuide
            title="How CPA is worked out"
            icon={Target}
            items={[
                { title: "The formula in words", description: "From campaign data, CPA equals total ad spend divided by conversions. From an estimate, CPA equals cost per click divided by the conversion rate, because each conversion needs one divided by the rate clicks.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "Campaign data: $1,000 of spend and 40 orders is a $25 CPA. Estimate: at $1.25 per click and a 2.5% conversion rate, each order takes 40 clicks, so the CPA is $50. The second campaign needs a better page or cheaper clicks before it matches the first.", icon: MousePointerClick, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "What CPA you can afford", description: "The most you can pay per customer is the profit a first order makes, or the profit over the customer's lifetime if you expect repeat orders. Enter it as the Target CPA and the result shows whether the campaign fits.", icon: Scale, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't include", description: "Ad platform CPA counts ad spend only. Agency fees, creative costs and tools add to the real cost per customer; add them to the spend if you want the full figure.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
