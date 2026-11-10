"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Percent, Calculator, BarChart2, TrendingUp, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function ConversionGuide() {
    return (
        <ToolGuide
            title="What the rate tells you"
            icon={Percent}
            items={[
                { title: "The formula in words", description: "Conversion rate equals conversions divided by visitors, times 100. A conversion is whatever you define it as, usually an order for a store or a sign-up for a service.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "10,000 sessions and 250 orders give a 2.5% conversion rate. Raising it to 3% at the same traffic adds 50 orders a month; at a $40 average order that's $2,000 of revenue without spending more on ads.", icon: BarChart2, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "Typical rates", description: "Online stores mostly convert between 1% and 3% of sessions; returning visitors and email traffic convert several times better than cold ad traffic. Rates by channel and by device tell you more than one overall number.", icon: TrendingUp, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't tell you", description: "The rate hides who the visitors were. A campaign that brings many curious visitors lowers the rate while adding orders, so read it alongside the order count and the revenue.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
