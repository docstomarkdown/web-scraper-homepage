import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import { listScraper as content } from "@/content/features/list-scraper";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} />;
}
