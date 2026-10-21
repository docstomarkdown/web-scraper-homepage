import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComparePage, { compareMetadata } from "@/components/pages/ComparePage";
import { comparePages } from "@/content/compare";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return Object.keys(comparePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = comparePages[slug];
    return c ? compareMetadata(c) : { title: "Not found" };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const c = comparePages[slug];
    if (!c) notFound();
    return <ComparePage content={c} />;
}

export const dynamicParams = false;
