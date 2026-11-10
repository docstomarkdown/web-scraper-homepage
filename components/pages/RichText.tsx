import Link from "next/link";
import { getLinkableGuides } from "@/lib/guides";

// Content files hold their copy as plain strings. A sentence that needs a link writes it the Markdown way,
// `[link text](/page)` or `[link text](https://other.site/)`, and this renders it: site-relative hrefs as
// Next links, other sites in a new tab. Nothing else in the string is interpreted. The JSON-LD and readability
// helpers use `plainText` so the link syntax never reaches structured data or the word counts.

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The string with its link syntax reduced to the link text. */
export const plainText = (s: string) => s.replace(LINK, "$1");

const linkCls = "text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2";

/** A link to a guide that isn't published 404s in production, so it renders as plain text until the guide is live
 * (spam review, 2026-11-10). Local preview links drafts too. */
const guideLive = (href: string) => {
    const slug = href.match(/^\/guides\/([a-z0-9-]+)/)?.[1];
    return !slug || getLinkableGuides().some((g) => g.slug === slug);
};

export default function RichText({ text }: { text: string }) {
    const parts: React.ReactNode[] = [];
    let last = 0;
    const re = new RegExp(LINK.source, "g");
    for (let m = re.exec(text); m; m = re.exec(text)) {
        const [whole, label, href] = m;
        const at = m.index;
        if (at > last) parts.push(text.slice(last, at));
        const external = /^https?:\/\//.test(href);
        if (!external && !guideLive(href)) {
            parts.push(label);
            last = at + whole.length;
            continue;
        }
        parts.push(
            external ? (
                <a key={at} href={href} target="_blank" rel="noopener" className={linkCls}>{label}</a>
            ) : (
                <Link key={at} href={href} className={linkCls}>{label}</Link>
            ),
        );
        last = at + whole.length;
    }
    if (parts.length === 0) return <>{text}</>;
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}
