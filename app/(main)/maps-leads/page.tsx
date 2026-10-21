import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import { mapsLeads as content } from "@/content/features/maps-leads";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} />;
}
