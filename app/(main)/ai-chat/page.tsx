import type { Metadata } from "next";
import FeaturePage from "@/components/pages/FeaturePage";
import ChatPageDemo from "@/components/pages/ChatPageDemo";
import { aiChat as content } from "@/content/features/ai-chat";

export const metadata: Metadata = {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: content.page.href },
    openGraph: { title: content.meta.title, description: content.meta.description, url: content.page.href },
};

export default function Page() {
    return <FeaturePage content={content} visual={<ChatPageDemo />} />;
}
