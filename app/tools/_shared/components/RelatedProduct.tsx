import Link from "next/link"

/**
 * One line under a calculator that names the Web Scraper Pro page for the reader's next step, where there is a real one
 * (calculator plan, phase 2): e.g. a fee calculator links collecting competitors' prices. `before` and `after` are the
 * words around the link; the link text says where it goes.
 */
export function RelatedProduct({ before, linkText, href, after = "" }: { before: string; linkText: string; href: string; after?: string }) {
    return (
        <p className="max-w-3xl mx-auto px-4 text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {before}{" "}
            <Link href={href} className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">
                {linkText}
            </Link>
            {after}
        </p>
    )
}
