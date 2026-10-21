import { Check } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import { Screenshot } from "@/components/Screenshot";

/**
 * One section of reading text on a feature, site or use-case page: a heading, two or three short paragraphs, and
 * optionally a checklist, a small table, a numbered mini-walkthrough and a screenshot. Readability rules in
 * docs/writing-style.md §11: paragraphs of two or three sentences, parallel facts as bullets or a table.
 */
export interface ContentSection {
    id: string;
    eyebrow?: string;
    heading: string;
    paragraphs: string[];
    points?: string[];
    /** A compact table, five columns or fewer, for anything parallel (settings, examples, before/after). */
    table?: { columns: string[]; rows: string[][]; caption?: string };
    /** A short numbered walkthrough inside the section, each item one bold line and one or two sentences. */
    steps?: { title: string; body: string }[];
    screenshot?: string;
}

const reading = "max-w-[56rem] mx-auto px-6 md:px-12";
const body = "text-lg text-slate-700 dark:text-slate-200 leading-[1.65]";
const h2 = "text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-tight";
const eyebrowCls = "text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]";

export default function ProseSection({ s }: { s: ContentSection }) {
    return (
        <section id={s.id} className="py-12 md:py-16 scroll-mt-24 border-t border-slate-200 dark:border-slate-800">
            <div className={reading}>
                <Reveal>
                    {s.eyebrow && <p className={eyebrowCls}>{s.eyebrow}</p>}
                    <h2 className={`${s.eyebrow ? "mt-2 " : ""}${h2}`}>{s.heading}</h2>
                    <div className={`mt-5 space-y-5 ${body}`}>
                        {s.paragraphs.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                        {s.points && s.points.length > 0 && (
                            <ul className="space-y-3">
                                {s.points.map((pt) => (
                                    <li key={pt} className="flex gap-3">
                                        <Check className="w-5 h-5 mt-[0.3em] shrink-0 text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {s.steps && s.steps.length > 0 && (
                            <ol className="space-y-4">
                                {s.steps.map((st, i) => (
                                    <li key={st.title} className="flex gap-4">
                                        <span className="mt-0.5 inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-[#2772ED]/10 text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true">{i + 1}</span>
                                        <span><strong className="font-semibold text-slate-800 dark:text-white">{st.title}</strong> {st.body}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                        {s.table && (
                            <figure className="overflow-x-auto" tabIndex={0} role="group" aria-label={`${s.heading} table, scrolls sideways`}>
                                <table className="w-full text-left border-collapse text-base leading-[1.5]">
                                    <thead>
                                        <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                                            {s.table.columns.map((col) => <th key={col} scope="col" className="py-2.5 pr-5 font-semibold text-slate-800 dark:text-white align-bottom">{col}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {s.table.rows.map((row, i) => (
                                            <tr key={i} className="border-b border-slate-100 dark:border-slate-800/60 align-top">
                                                {row.map((cell, j) => <td key={j} className="py-3 pr-5 text-slate-700 dark:text-slate-200">{cell}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {s.table.caption && <figcaption className="mt-2 text-base text-slate-600 dark:text-slate-300">{s.table.caption}</figcaption>}
                            </figure>
                        )}
                    </div>
                    {s.screenshot && <Screenshot id={s.screenshot} className="mt-8 mb-0" />}
                </Reveal>
            </div>
        </section>
    );
}
