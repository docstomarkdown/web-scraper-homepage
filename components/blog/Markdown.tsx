import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Screenshot } from "@/components/Screenshot";

// Markdown body for posts and guides. Images keep their own size (screenshots are never cropped), an image whose
// source is `visual:<id>` renders that capture from the visuals library, and every colour has its dark counterpart.
const components = {
    h2: (p: React.ComponentProps<"h2">) => <h2 className="text-[1.6rem] font-semibold mt-14 mb-4 text-slate-800 dark:text-white tracking-tight leading-snug scroll-mt-24" {...p} />,
    h3: (p: React.ComponentProps<"h3">) => <h3 className="text-xl font-semibold mt-10 mb-3 text-slate-800 dark:text-white leading-snug" {...p} />,
    // A paragraph holding only an image is unwrapped, because images render as <figure>, which can't sit inside <p>.
    p: ({ node, ...p }: React.ComponentProps<"p"> & { node?: { children?: { type: string; tagName?: string; value?: string }[] } }) => {
        const kids = (node?.children ?? []).filter((c) => !(c.type === "text" && !c.value?.trim()));
        if (kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img") return <>{p.children}</>;
        return <p className="my-5 text-lg leading-[1.65] text-slate-700 dark:text-slate-200" {...p} />;
    },
    ul: (p: React.ComponentProps<"ul">) => <ul className="my-5 pl-6 list-disc space-y-2 text-lg leading-[1.65] text-slate-700 dark:text-slate-200" {...p} />,
    ol: (p: React.ComponentProps<"ol">) => <ol className="my-5 pl-6 list-decimal space-y-2 text-lg leading-[1.65] text-slate-700 dark:text-slate-200" {...p} />,
    a: (p: React.ComponentProps<"a">) => <a className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2" {...p} />,
    strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold text-slate-900 dark:text-white" {...p} />,
    code: (p: React.ComponentProps<"code">) => <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:text-slate-200" {...p} />,
    pre: (p: React.ComponentProps<"pre">) => <pre tabIndex={0} className="my-6 overflow-x-auto rounded-xl bg-slate-900 dark:bg-slate-800 p-4 text-sm text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit" {...p} />,
    blockquote: (p: React.ComponentProps<"blockquote">) => <blockquote className="my-8 border-l-2 border-[#1f5ec2] pl-5 text-lg text-slate-700 dark:text-slate-200 italic" {...p} />,
    table: (p: React.ComponentProps<"table">) => (
        <div className="my-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Table, scrolls sideways">
            <table className="w-full text-base leading-[1.5] text-left border-collapse" {...p} />
        </div>
    ),
    th: (p: React.ComponentProps<"th">) => <th className="border-b-2 border-slate-200 dark:border-slate-700 py-2.5 pr-5 font-semibold text-slate-800 dark:text-white align-bottom" {...p} />,
    td: (p: React.ComponentProps<"td">) => <td className="border-b border-slate-100 dark:border-slate-800/60 py-3 pr-5 text-slate-700 dark:text-slate-200 align-top" {...p} />,
    img: ({ src, alt }: React.ComponentProps<"img">) => {
        const s = typeof src === "string" ? src : "";
        if (s.startsWith("visual:")) return <Screenshot id={s.slice("visual:".length)} caption={alt || undefined} />;
        return (
            <figure className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s || undefined} alt={alt ?? ""} loading="lazy" className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm" />
                {alt ? <figcaption className="mt-2 text-sm text-slate-600 dark:text-slate-300">{alt}</figcaption> : null}
            </figure>
        );
    },
    hr: () => <hr className="my-10 border-slate-200 dark:border-slate-800" />,
};

export function Markdown({ content }: { content: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} urlTransform={(url) => (url.startsWith("visual:") ? url : defaultUrlTransform(url))}>
            {content}
        </ReactMarkdown>
    );
}
