import Link from "next/link";
import { ArrowRight, Chrome } from "lucide-react";
import { productConfig } from "@/config/product";

// The call to action at the end of every free tool page: the extension, with the tools placement in its link.
export function CTA({ withSectionWrapper = true }: { withSectionWrapper?: boolean }) {
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=tools&utm_campaign=chrome_install`;
    const content = (
        <div className="max-w-4xl mx-auto px-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Need the product data behind these numbers?
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Web Scraper Pro collects prices, listings and reviews from Amazon, Etsy, eBay and most online stores into a
                    spreadsheet. Ask for what you want in plain words, or click Collect on any list.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <Link
                        href={installUrl}
                        target="_blank"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-6 py-3.5 text-base font-semibold text-white transition-colors"
                    >
                        <Chrome className="w-5 h-5" aria-hidden="true" />
                        Add to Chrome
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/#what-you-can-collect"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        See what it collects
                    </Link>
                </div>
            </div>
        </div>
    );
    if (!withSectionWrapper) return content;
    return <section className="py-20 bg-slate-50 dark:bg-slate-950">{content}</section>;
}
