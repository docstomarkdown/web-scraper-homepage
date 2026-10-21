import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Markdown body for posts and guides. Images keep their own size (screenshots are never cropped),
// and every colour has its dark counterpart.
const components = {
    h2: (p: React.ComponentProps<"h2">) => <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900 dark:text-white tracking-tight" {...p} />,
    h3: (p: React.ComponentProps<"h3">) => <h3 className="text-xl font-semibold mt-8 mb-3 text-slate-900 dark:text-white" {...p} />,
    p: (p: React.ComponentProps<"p">) => <p className="my-5 text-[17px] leading-relaxed text-slate-700 dark:text-slate-300" {...p} />,
    ul: (p: React.ComponentProps<"ul">) => <ul className="my-5 pl-6 list-disc space-y-2 text-[17px] text-slate-700 dark:text-slate-300" {...p} />,
    ol: (p: React.ComponentProps<"ol">) => <ol className="my-5 pl-6 list-decimal space-y-2 text-[17px] text-slate-700 dark:text-slate-300" {...p} />,
    a: (p: React.ComponentProps<"a">) => <a className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2" {...p} />,
    strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold text-slate-900 dark:text-white" {...p} />,
    code: (p: React.ComponentProps<"code">) => <code className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:text-slate-200" {...p} />,
    pre: (p: React.ComponentProps<"pre">) => <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 dark:bg-slate-800 p-4 text-sm text-slate-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit" {...p} />,
    blockquote: (p: React.ComponentProps<"blockquote">) => <blockquote className="my-6 border-l-4 border-[#2772ED] pl-4 text-slate-600 dark:text-slate-300" {...p} />,
    table: (p: React.ComponentProps<"table">) => (
        <div className="my-6 overflow-x-auto">
            <table className="w-full text-[15px] text-left border-collapse" {...p} />
        </div>
    ),
    th: (p: React.ComponentProps<"th">) => <th className="border-b border-slate-200 dark:border-slate-800 py-2 pr-4 font-semibold text-slate-900 dark:text-white" {...p} />,
    td: (p: React.ComponentProps<"td">) => <td className="border-b border-slate-100 dark:border-slate-800/60 py-2 pr-4 text-slate-700 dark:text-slate-300 align-top" {...p} />,
    img: ({ src, alt }: React.ComponentProps<"img">) => (
        <figure className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="w-full h-auto rounded-xl border border-slate-200 dark:border-slate-800" />
            {alt ? <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">{alt}</figcaption> : null}
        </figure>
    ),
    hr: () => <hr className="my-10 border-slate-200 dark:border-slate-800" />,
};

export function Markdown({ content }: { content: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMarkdown>
    );
}
