import Link from "next/link";

// Content files hold their copy as plain strings. A sentence that needs a link writes it the Markdown way,
// `[link text](/page)` or `[link text](https://other.site/)`, and this renders it: site-relative hrefs as
// Next links, other sites in a new tab. Nothing else in the string is interpreted. The JSON-LD and readability
// helpers use `plainText` so the link syntax never reaches structured data or the word counts.

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The string with its link syntax reduced to the link text. */
export const plainText = (s: string) => s.replace(LINK, "$1");

const linkCls = "text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2";

export default function RichText({ text }: { text: string }) {
    const parts: React.ReactNode[] = [];
    let last = 0;
    const re = new RegExp(LINK.source, "g");
    for (let m = re.exec(text); m; m = re.exec(text)) {
        const [whole, label, href] = m;
        const at = m.index;
        if (at > last) parts.push(text.slice(last, at));
        const external = /^https?:\/\//.test(href);
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
