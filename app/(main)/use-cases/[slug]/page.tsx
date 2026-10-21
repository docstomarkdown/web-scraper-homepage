import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCasePage, { metadataForUseCase, isUseCaseVisible } from "@/components/pages/UseCasePage";
import { useCasePages } from "@/content/use-cases";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return Object.values(useCasePages).filter((c) => c.status === "published").map((c) => ({ slug: c.page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = useCasePages[slug];
    return c && isUseCaseVisible(c) ? metadataForUseCase(c) : { title: "Not found" };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const c = useCasePages[slug];
    if (!c || !isUseCaseVisible(c)) notFound();
    return <UseCasePage content={c} />;
}

export const dynamicParams = false;
