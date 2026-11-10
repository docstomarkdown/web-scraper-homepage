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
                { title: "The formula in words", description: "From campaign data, CPA equals total ad spend divided by conversions. From an estimate, CPA equals cost per click divided by the conversion rate, because each conversion needs one divided by the rate clicks.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "Campaign data: $1,000 of spend and 40 orders is a $25 CPA. Estimate: at $1.25 per click and a 2.5% conversion rate, each order takes 40 clicks, so the CPA is $50. The second campaign needs a better page or cheaper clicks before it matches the first.", icon: MousePointerClick, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What CPA you can afford", description: "The most you can pay per customer is the profit a first order makes, or the profit over the customer's lifetime if you expect repeat orders. Enter it as the Target CPA and the result shows whether the campaign fits.", icon: Scale, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't include", description: "Ad platform CPA counts ad spend only. Agency fees, creative costs and tools add to the real cost per customer; add them to the spend if you want the full figure.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
