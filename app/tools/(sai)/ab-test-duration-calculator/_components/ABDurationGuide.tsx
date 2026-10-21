"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Split, Calculator, Percent, Clock, Timer } from "lucide-react"

/** What the calculator computes, the formula in words, where the inputs come from, and one worked example. */
export function ABDurationGuide() {
    return (
        <ToolGuide
            title="How the duration is worked out"
            icon={Split}
            items={[
                { title: "What the calculator computes", description: "It finds how many visitors each variant needs so that a real difference shows up as significant, then divides by your daily traffic to get days. It uses a 95% confidence level and 80% power, the usual settings for website tests.", icon: Calculator, iconBg: "bg-blue-50 dark:bg-blue-950/40", iconColor: "text-blue-700 dark:text-blue-300" },
                { title: "The formula in words", description: "Sample size per variant equals (1.96 + 0.84) squared, times the sum of each rate times one minus itself, divided by the squared difference between the two rates. The new rate is your current rate raised by the expected improvement. Days equal the sample size divided by the visitors the smaller variant gets per day.", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40", iconColor: "text-amber-700 dark:text-amber-300" },
                { title: "A worked example", description: "Current rate 5%, expected improvement 10% (so the new rate is 5.5%), 2,000 daily visitors, 50/50 split. Each variant needs 31,196 visitors, 62,392 in total, which is 32 days at 1,000 visitors per variant per day.", icon: Clock, iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconColor: "text-emerald-700 dark:text-emerald-300" },
                { title: "What it doesn't do", description: "It assumes visitors are split evenly over the period and that nothing else changes mid-test. Weekends, campaigns and holidays shift conversion rates, so run at least one full week even when the maths says fewer days.", icon: Timer, iconBg: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-700 dark:text-violet-300" }
            ]}
        />
    )
}
