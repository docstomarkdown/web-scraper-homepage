import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAuthors, getPostsByAuthor } from "@/lib/posts";
import { getAuthor } from "@/content/authors";
import SectionHeading from "@/components/landing/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";

type Props = { params: Promise<{ author: string }> };

export function generateStaticParams() {
    return getAllAuthors().map((author) => ({ author }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { author } = await params;
    const posts = getPostsByAuthor(author);
    if (posts.length === 0) return { title: "Author not found" };
    const a = getAuthor(author);
    return {
        title: `Posts by ${a.name}`,
        description: a.bio,
        alternates: { canonical: `/blog/author/${author}` },
        // An archive with one post is thin; it's listed in the sitemap, and indexed, only once it holds more.
        robots: posts.length > 1 ? undefined : { index: false, follow: true },
    };
}

export default async function AuthorPage({ params }: Props) {
    const { author } = await params;
    const posts = getPostsByAuthor(author);
    if (posts.length === 0) notFound();
    const a = getAuthor(author);
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow={a.role} title={`Posts by ${a.name}`} intro={a.bio} />
                <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
