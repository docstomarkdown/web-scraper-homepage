import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import { productScraper as content } from "@/content/features/product-scraper";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} />;
}
