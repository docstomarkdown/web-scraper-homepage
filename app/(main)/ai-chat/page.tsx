import type { Metadata } from "next";
import FeaturePage, { featureMetadata } from "@/components/pages/FeaturePage";
import ChatPageDemo from "@/components/pages/ChatPageDemo";
import { aiChat as content } from "@/content/features/ai-chat";

export const metadata: Metadata = featureMetadata(content);

export default function Page() {
    return <FeaturePage content={content} visual={<ChatPageDemo />} />;
}
