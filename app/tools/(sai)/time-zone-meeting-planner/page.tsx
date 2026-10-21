import { Metadata } from "next"
import { TimeZonePlanner } from "./_components/TimeZonePlanner"
import { MeetingPlannerHowToUse } from "./_components/MeetingPlannerHowToUse"
import { MeetingPlannerGuide } from "./_components/MeetingPlannerGuide"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Time Zone Meeting Planner: Free Overlap Finder",
    description: "Pick your city and the cities of your suppliers or team, and see which hours fall inside everyone's working day before you set a call time.",
    alternates: { canonical: "/tools/time-zone-meeting-planner" },
}

const faqs = [
    {
        question: "Does the planner adjust for daylight saving?",
        answer: "Yes. It uses each time zone's current offset from your browser, so it follows daylight saving automatically.",
    },
    {
        question: "Which time zone is CST?",
        answer: "The abbreviation is used for both US Central and China Standard Time. Pick the city rather than the abbreviation to avoid the mix-up.",
    },
    {
        question: "Can I add more than three cities?",
        answer: "Yes. Add as many as you need; each one shows its local time and whether it is in business hours.",
    },
    {
        question: "What counts as business hours?",
        answer: "9 am to 5 pm in each city's local time. Adjust for your own contacts if they work different hours.",
    },
]

export default function TimeZoneMeetingPlannerPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Time Zone Meeting Planner" direction="down" duration={0.6} />
                <div className="mb-20">
                    <TimeZonePlanner />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MeetingPlannerHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MeetingPlannerGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ title="Questions, answered" faqs={faqs} />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
