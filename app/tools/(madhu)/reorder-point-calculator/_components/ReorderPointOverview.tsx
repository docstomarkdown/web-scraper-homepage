"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

/** What this calculator does, in plain words. Copy rules: docs/writing-style.md. */
export function ReorderPointOverview() {
    return (
        <div id="overview">
            <ToolOverview
                heading="What the reorder point calculator tells you"
                headingAccent="reorder point calculator"
                definition="The reorder point is the stock level that triggers an order, set so the goods arrive before you run out. Type the units you sell a day, the days your supplier takes, and the safety stock you keep (in units or days of sales), and the calculator gives the level and the days of sales it covers. Add your current stock and it works as an inventory reorder check: order now, or how many days until you must."
                facts={[
                    { stat: "Reorder at", label: "this many units", detail: "Lead-time demand plus safety stock, rounded up." },
                    { stat: "Lead-time demand", label: "what sells while you wait", detail: "Daily sales multiplied by delivery days." },
                    { stat: "Coverage", label: "in days", detail: "How many days of sales the reorder point represents." },
                    { stat: "Order now or not yet", label: "with current stock", detail: "(Current stock − reorder point) ÷ daily sales gives the days left. 0 means order today." },
                ]}
            />
        </div>
    )
}
