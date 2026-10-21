import { getCapture } from "@/lib/visuals";
import { showPlannedPages } from "@/config/pages";

/**
 * A product screenshot from the visuals library, by id. Alt text and caption come from the manifest, so
 * every page that shows the same capture says the same thing. A capture that isn't in the library yet
 * renders a labelled placeholder in local development and nothing in production.
 */
export function Screenshot({ id, caption, className }: { id: string; caption?: string; className?: string }) {
    const c = getCapture(id);
    if (!c) {
        if (!showPlannedPages) return null;
        return (
            <div className={`my-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-sm text-slate-500 dark:text-slate-400 ${className ?? ""}`}>
                Screenshot to capture: <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5">{id}</code>
            </div>
        );
    }
    const text = caption ?? c.caption;
    return (
        <figure className={`my-8 ${className ?? ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`/visuals/${c.file}`}
                alt={c.alt}
                width={c.width}
                height={c.height}
                loading="lazy"
                className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white"
            />
            {text ? <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">{text}</figcaption> : null}
        </figure>
    );
}
