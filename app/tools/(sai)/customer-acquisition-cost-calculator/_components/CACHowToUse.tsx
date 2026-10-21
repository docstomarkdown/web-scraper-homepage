"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Banknote, Users, Calculator } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function CACHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your Total Sales & Marketing Costs", description: "Everything spent to win customers in the period: ad spend, agency and tool fees, sales salaries and commissions, content and promotions.", icon: Banknote },
                { title: "Enter the New Customers Acquired", description: "First-time customers in the same period, not all orders. Returning customers were acquired earlier.", icon: Users },
                { title: "Read the customer acquisition cost", description: "What one new customer cost you. Compare it with the profit a customer brings over their lifetime; the customer lifetime value calculator on this site gives that figure.", icon: Calculator }
            ]}
        />
    )
}
