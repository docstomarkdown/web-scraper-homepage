"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { BookOpen, Calculator, RefreshCw, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function ReorderPointGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Lead-time demand is daily sales multiplied by delivery days. The reorder point is lead-time demand plus safety stock, rounded up to a whole unit. Coverage is the reorder point divided by daily sales.",
                    icon: Calculator,
                    stat: "D × L + S",
                    statLabel: "the formula",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Daily sales are in your sales report. Delivery days come from your supplier and forwarder, with your own buffer. Safety stock is your call; one to two weeks of sales is common for steady products.",
                    icon: BookOpen,
                    stat: "1–2 weeks",
                    statLabel: "of safety stock",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "25 units a day with a 14-day delivery is 350 units of lead-time demand. With 50 units of safety stock, the reorder point is 400. That covers 16 days of sales, so you order when stock hits 400 and the delivery lands with about 50 to spare.",
                    icon: Table,
                    stat: "400",
                    statLabel: "units",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "Use it with EOQ",
                    description: "The reorder point says when to order; the economic order quantity says how much. Together they set a steady cycle: order the EOQ each time stock reaches the reorder point.",
                    icon: RefreshCw,
                    stat: "When + how much",
                    statLabel: "ROP and EOQ",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
