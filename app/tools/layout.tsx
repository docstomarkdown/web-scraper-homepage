import { Metadata } from "next";

export const metadata: Metadata = {
    // A title object, not a string: a plain string here would stop the root template reaching the tool pages.
    title: { default: "Free seller calculators", template: "%s | Web Scraper Pro" },
    description: "Free calculators for online sellers: marketplace fees, profit margins, shipping, inventory and advertising.",
    alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
