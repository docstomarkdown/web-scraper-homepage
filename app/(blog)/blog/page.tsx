import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "@/components/landing/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";

export const metadata: Metadata = {
    title: "Blog",
    description: "Explainers, comparisons and news about collecting web data with Web Scraper Pro.",
    alternates: { canonical: "/blog" },
};

export default function BlogPage() {
    const posts = getAllPosts();
    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Blog" title="Explainers, comparisons and news" intro="Short reads about getting data out of web pages and into a spreadsheet." />
                {posts.length === 0 ? (
                    <p className="mt-12 text-lg text-slate-600 dark:text-slate-300">
                        The first posts are being written. Until then, the feature pages describe what Web Scraper Pro collects from each kind of site.
                    </p>
                ) : (
                    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <PostCard post={post} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
