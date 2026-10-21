import { ogImage, OG_SIZE } from "@/lib/og";

// The default Open Graph image for every page that doesn't set its own (see lib/og.tsx and /api/og).
export const alt = "Web Scraper Pro: turn any web page into a spreadsheet";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ title: "Turn any web page into a spreadsheet.", subtitle: "A Chrome extension. Ask for the data you want and get a table ready for Excel or Google Sheets." });
}
