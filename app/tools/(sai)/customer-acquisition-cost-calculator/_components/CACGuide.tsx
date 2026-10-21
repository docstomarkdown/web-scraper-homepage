"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Users, Calculator, Scale, TrendingUp, AlertTriangle } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function CACGuide() {
    return (
        <ToolGuide
            title="What CAC tells you"
            icon={Users}
            items={[
                { title: "The formula in words", description: "Customer acquisition cost equals total sales and marketing costs divided by the number of new customers won in the same period. Include every cost that exists to win customers, not only ad spend.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "A worked example", description: "$12,000 spent on ads, tools and a part-time marketer in a month that brought 300 first-time customers is a CAC of $40. If a customer's lifetime profit is $120, the ratio is 3 to 1, the usual benchmark for a healthy business.", icon: Scale, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "CAC by channel", description: "An overall CAC hides the spread. Work it out per channel, email, search, social, referrals, and move budget towards the channels whose CAC is lowest relative to the customers' value.", icon: TrendingUp, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't do", description: "It counts customers won this period against costs spent this period. Campaigns that bring customers next month make this month's CAC look worse, so use a few months of data for decisions.", icon: AlertTriangle, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
