import { FadeIn } from "./FadeIn"

interface ToolPageTitleProps {
    title: string
    direction?: "up" | "down" | "left" | "right"
    duration?: number
}

/** The page's single h1. */
export function ToolPageTitle({ title, direction, duration }: ToolPageTitleProps) {
    if (!title?.trim()) return null
    return (
        <div className="text-center mb-12">
            <FadeIn direction={direction} duration={duration}>
                <h1 className="text-[2rem] md:text-[2.5rem] font-semibold text-slate-800 mb-4 tracking-tight leading-[1.2] dark:text-white">
                    {title}
                </h1>
            </FadeIn>
        </div>
    )
}
