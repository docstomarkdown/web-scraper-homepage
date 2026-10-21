// "Words on this page": one-line meanings for the product and file words a first-time reader meets before the page
// explains them (cold-read finding, 2026-10-21). A template passes the page's text; only the terms that appear are
// listed, in the order below. Keep each meaning to one plain sentence.

const TERMS: { term: string; test: RegExp; meaning: string }[] = [
    { term: "Side panel", test: /side panel/i, meaning: "The extension's own window, which opens on the right of your browser next to the page." },
    { term: "List tab", test: /\bList tab\b/, meaning: "The side panel tab that finds the lists on the page you're looking at and collects them." },
    { term: "Properties tab", test: /Properties tab/, meaning: "The side panel tab for one page's details: a product's fields and reviews, a page's text, or the contact details on a site." },
    { term: "Chat tab", test: /\bChat tab\b/, meaning: "The side panel tab where you type what you want in plain words, such as \"find dentists in Austin\"." },
    { term: "Results page", test: /results page|results tab/i, meaning: "The table that opens in a new tab when a run finishes, where you tidy the columns and export." },
    { term: "Bulk scrape", test: /Bulk scrape/, meaning: "A run over many web addresses at once: paste them in, set up each site once, and get one merged table." },
    { term: "Use saved data", test: /Use saved data/, meaning: "A button on the Bulk page that takes the addresses from a table you collected earlier, such as its Website column, instead of pasting them." },
    { term: "History", test: /\bHistory\b/, meaning: "Where every table you've collected is kept until you delete it, so you can reopen or export it later." },
    { term: "Pack", test: /\b(ready-made setup|pack)\b/i, meaning: "A ready-made setup for a popular site, so the columns come out named without any setup." },
    { term: "Google Sheets", test: /Google Sheets/, meaning: "Google's free online spreadsheet. The extension can send a table straight into a new sheet in your Google Drive." },
    { term: "CSV", test: /\bCSV\b/, meaning: "A plain text spreadsheet file that Excel, Google Sheets and most other tools open." },
    { term: "JSON", test: /\bJSON\b/, meaning: "A text format for data that programs and developers read; you don't need it for a spreadsheet." },
    { term: "URL", test: /\bURLs?\b/, meaning: "A web address, the text in your browser's address bar." },
    { term: "API", test: /\bAPI\b/, meaning: "A way for one program to ask another for data directly, without a browser. Not something you need for the extension." },
    { term: "API key", test: /API key/, meaning: "A password-like code that lets a program use a service. The extension doesn't need one." },
    { term: "MCP", test: /\bMCP\b/, meaning: "A standard that lets AI assistants such as Claude use other tools. Coming to the extension later." },
    { term: "Verification page", test: /verification/i, meaning: "A page a site shows to check you're a person, such as a puzzle. Complete it in the tab and the run carries on." },
    { term: "Auto scroll", test: /Auto scroll|infinite scroll|loads as you scroll/i, meaning: "How some pages add more items as you scroll down. The extension scrolls for you until nothing new loads." },
    { term: "Load more", test: /Load more/, meaning: "A button some pages use to show the next batch of items. The extension clicks it for you." },
    { term: "Next page", test: /Next page|next-page/i, meaning: "The link or button that moves a list to its next page. The extension clicks it until the pages run out." },
];

export function termsIn(text: string) {
    return TERMS.filter((t) => t.test.test(text));
}

/** A folded "Words on this page" list; renders nothing when the page uses none of the terms. */
export default function Glossary({ text, className = "" }: { text: string; className?: string }) {
    const found = termsIn(text);
    if (found.length === 0) return null;
    return (
        <details className={`group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-4 ${className}`}>
            <summary className="cursor-pointer list-none text-lg font-semibold text-slate-800 dark:text-white [&::-webkit-details-marker]:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2]">
                Words on this page <span className="font-normal text-slate-600 dark:text-slate-300">({found.length})</span>
            </summary>
            <dl className="mt-4 space-y-3">
                {found.map((t) => (
                    <div key={t.term} className="text-lg leading-[1.6]">
                        <dt className="inline font-semibold text-slate-800 dark:text-white">{t.term}. </dt>
                        <dd className="inline text-slate-700 dark:text-slate-200">{t.meaning}</dd>
                    </div>
                ))}
            </dl>
        </details>
    );
}
