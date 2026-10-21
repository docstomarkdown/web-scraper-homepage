"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function NetProfitOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the Net Profit Calculator tells you"
                headingAccent="Net Profit Calculator"
                definition="Net profit is what's left after everything: the goods, the advertising, the overheads and the tax. Type the five numbers for a period and the calculator shows gross profit, operating profit and net profit, each with its margin, and where every dollar of revenue went."
                facts={[
                    { stat: "Gross", label: "after goods", detail: "Revenue minus cost of goods sold." },
                    { stat: "Operating", label: "after running costs", detail: "Gross profit minus advertising and overheads." },
                    { stat: "Net", label: "after tax", detail: "Operating profit minus tax at your rate, with the net margin." },
                ]}
            />
        </div>
    )
}
