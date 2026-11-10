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
                { title: "The formula in words", description: "Customer acquisition cost equals total sales and marketing costs divided by the number of new customers won in the same period. Include every cost that exists to win customers, not only ad spend. From an estimate, CAC (or CPA) equals cost per click divided by the conversion rate: $1.25 per click at 2.5% is $50.", icon: Calculator, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "A worked example", description: "$12,000 spent on ads, tools and a part-time marketer in a month that brought 300 first-time customers is a CAC of $40. If a customer's lifetime profit is $120, the LTV:CAC ratio is 3 to 1, a common rule of thumb for a healthy business.", icon: Scale, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "CAC by channel", description: "An overall CAC hides the spread. Work it out per channel, email, search, social, referrals, and move budget towards the channels whose CAC is lowest relative to the customers' value.", icon: TrendingUp, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" },
                { title: "What it doesn't do", description: "It counts customers won this period against costs spent this period. Campaigns that bring customers next month make this month's CAC look worse, so use a few months of data for decisions.", icon: AlertTriangle, iconBg: "bg-[#2772ED]/10 dark:bg-[#2772ED]/20", iconColor: "text-[#1f5ec2] dark:text-[#7aa7ff]" }
            ]}
        />
    )
}
