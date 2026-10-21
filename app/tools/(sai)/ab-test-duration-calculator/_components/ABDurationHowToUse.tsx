"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, Percent, Clock } from "lucide-react"

/** The three things a reader does, in order, with the calculator's own field names. */
export function ABDurationHowToUse() {
    return (
        <ToolSteps
            steps={[
                { title: "Enter your daily visitors and current conversion rate", description: "Daily Visitors is the number of people who reach the page you're testing each day. Current Conversion Rate (%) is the share of them who do the thing you measure today, such as buying or signing up.", icon: Users },
                { title: "Set the improvement you want to detect", description: "Expected Improvement (%) is how much better the new version must be before you'd call it a win, relative to today's rate. Smaller improvements take longer to prove.", icon: Percent },
                { title: "Read the sample size and the days", description: "The result shows visitors per variant, total visitors and the number of days at your traffic split. Run the test for the whole period before you read the winner.", icon: Clock }
            ]}
        />
    )
}
