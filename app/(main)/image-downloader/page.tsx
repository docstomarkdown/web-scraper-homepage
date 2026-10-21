import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import { imageDownloader as content } from "@/content/features/image-downloader";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} />;
}
