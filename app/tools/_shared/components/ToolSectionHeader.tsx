import { LucideIcon } from "lucide-react"

interface ToolSectionHeaderProps {
    icon: LucideIcon
    title: string
    subtitle?: string
}

/** A section's h2 with its icon; renders nothing when the title is empty. */
export function ToolSectionHeader({ icon: Icon, title, subtitle }: ToolSectionHeaderProps) {
    if (!title?.trim()) return null
    return (
        <div className="mb-8 md:mb-10 px-1">
            <div className={`flex items-center gap-3.5 sm:gap-4 ${subtitle ? "mb-3" : "mb-0"}`}>
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#2772ED]/10 dark:bg-[#2772ED]/20" aria-hidden="true">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#1f5ec2] dark:text-[#7aa7ff]" />
                </div>
                <h2 className="text-[1.5rem] sm:text-[1.75rem] font-semibold text-slate-800 tracking-tight leading-tight dark:text-white">
                    {title}
                </h2>
            </div>
            {subtitle && (
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-1 dark:text-slate-200">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
