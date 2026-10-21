"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Package, AlertTriangle, TrendingUp } from "lucide-react";
export function MOQGuide() {
    return (
        <ToolGuide
            title="Understanding Minimum Order Quantity (MOQ)"
            icon={BookOpen}
            items={[
                {
                    title: "Minimum Order Quantity (MOQ) Fundamentals",
                    description: "Minimum Order Quantity (MOQ) is the lowest number of units a supplier is willing to sell to you at once. Suppliers use Minimum Order Quantities (MOQs) to cover their production overheads and ensure profitability.",
                    icon: Package,
                    iconBg: "bg-blue-50 dark:bg-blue-950/40",
                    iconColor: "text-blue-500 dark:text-blue-400",
                    stat: "Key Term",
                    statColor: "text-blue-600 dark:text-blue-400",
                    statLabel: "Definition",
                    tooltip: "The hurdle you must clear to buy."
                },
                {
                    title: "Inventory and 'Cash Trap' Risks",
                    description: "A high Minimum Order Quantity (MOQ) can tie up all your capital in inventory that sits in a warehouse. If your sales velocity is low, a large Minimum Order Quantity (MOQ) means you'll be paying storage fees for months (or years) before you see your cash back.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50 dark:bg-amber-950/40",
                    iconColor: "text-amber-500 dark:text-amber-400",
                    stat: "Danger",
                    statColor: "text-amber-600 dark:text-amber-400",
                    statLabel: "Financial Risk",
                    tooltip: "Don't buy 2 years of stock!"
                },
                {
                    title: "Minimum Order Quantity (MOQ) Negotiation",
                    description: "Minimum Order Quantities (MOQs) are often negotiable. You can offer to pay a slightly higher cost per unit for a smaller test batch, or split the production into two shipments to manage cash flow better.",
                    icon: TrendingUp,
                    iconBg: "bg-green-50 dark:bg-green-950/40",
                    iconColor: "text-green-500 dark:text-green-400",
                    stat: "Strategy",
                    statColor: "text-blue-600 dark:text-blue-400",
                    statLabel: "Actionable Tip",
                    tooltip: "Ask for a lower test quantity."
                }
            ]}
        />
    );
}