"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { AlertTriangle, BookOpen, Calculator, Table } from "lucide-react"

/** The formula in words, where the inputs come from, a worked example, and what the result leaves out. */
export function NetProfitGuide() {
    return (
        <ToolGuide
            title="How the numbers are worked out"
            icon={BookOpen}
            items={[
                {
                    title: "The formula, in words",
                    description: "Gross profit is revenue minus cost of goods sold. Operating profit is gross profit minus advertising minus overheads. Tax is operating profit times the tax rate, when the profit is positive. Net profit is operating profit minus tax. Each margin is the profit divided by revenue.",
                    icon: Calculator,
                    stat: "3 levels",
                    statLabel: "gross, operating, net",
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-700 dark:text-blue-300",
                    statColor: "text-blue-700 dark:text-blue-300",
                },                {
                    title: "Where the inputs come from",
                    description: "Revenue and cost of goods sold come from your store and supplier records. Advertising comes from your ads managers. Overheads come from your bank statement or accounts. The tax rate is your accountant's figure.",
                    icon: BookOpen,
                    stat: "4 sources",
                    statLabel: "store, ads, bank, accountant",
                    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
                    iconColor: "text-emerald-700 dark:text-emerald-300",
                    statColor: "text-emerald-700 dark:text-emerald-300",
                },                {
                    title: "A worked example",
                    description: "$50,000 of revenue with $15,000 cost of goods gives $35,000 gross profit, a 70% margin. After $5,000 of advertising and $2,000 of overheads, operating profit is $28,000. At a 20% tax rate, tax is $5,600 and net profit $22,400, a 44.8% net margin.",
                    icon: Table,
                    stat: "44.8%",
                    statLabel: "net margin",
                    iconBg: "bg-violet-50 dark:bg-violet-950/40",
                    iconColor: "text-violet-700 dark:text-violet-300",
                    statColor: "text-violet-700 dark:text-violet-300",
                },                {
                    title: "What it leaves out",
                    description: "Marketplace fees and payment fees belong in overheads or cost of goods; add them or the net is too high. Refunds reduce revenue. Loan interest and depreciation aren't modelled.",
                    icon: AlertTriangle,
                    stat: "Fees",
                    statLabel: "go in overheads",
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-700 dark:text-amber-300",
                    statColor: "text-amber-700 dark:text-amber-300",
                }
            ]}
        />
    )
}
