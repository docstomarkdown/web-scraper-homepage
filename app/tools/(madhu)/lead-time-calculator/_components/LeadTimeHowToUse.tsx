"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { AlertTriangle, Clock, Table, Truck } from "lucide-react"

export function LeadTimeHowToUse() {
    return (
        <ToolSteps
            title="How to use this calculator"
            steps={[
                { title: "Type the supplier time", description: "The days from your order to the goods leaving the factory, including any queue before production starts.", icon: Clock },
                { title: "Type the shipping time", description: "Days in transit, including customs and the last leg to your warehouse or fulfilment centre.", icon: Truck },
                { title: "Add a safety buffer", description: "Extra days for the things that go wrong: a holiday, a port delay, a quality check. A week is a common starting point.", icon: AlertTriangle },
                { title: "Read the results", description: "Total lead time is the main number, with the arrival date and the share each part takes.", icon: Table },
            ]}
        />
    )
}
