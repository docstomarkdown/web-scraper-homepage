"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, Clock, Receipt, TrendingUp } from "lucide-react"

export function ROIGuide() {
    return (
        <ToolGuide
            title="How ROI is calculated"
            icon={BookOpen}
            items={[
                {
                    title: "Total ROI",
                    description: "ROI = (amount returned − amount invested) ÷ amount invested × 100. Investing $1,000 and getting back $2,000 is a 100% return.",
                    icon: Calculator,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                },
                {
                    title: "Annualised ROI",
                    description: "Annualised ROI = (returned ÷ invested) ^ (1 ÷ years) − 1. It lets you compare a return earned in three months with one earned over two years.",
                    icon: Clock,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                },
                {
                    title: "What to count as invested",
                    description: "Product cost, inbound shipping, packaging, marketplace and payment fees, ads, and tools you bought for the project. Leaving costs out inflates the result.",
                    icon: Receipt,
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                },
                {
                    title: "A worked example",
                    description: "$1,000 invested, $2,000 returned over one year: net profit $1,000, ROI 100%, annualised 100%. Over two years the same return annualises to 41.4% a year.",
                    icon: TrendingUp,
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                },
            ]}
        />
    )
}
