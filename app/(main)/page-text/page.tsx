import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import { pageText as content } from "@/content/features/page-text";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} />;
}
