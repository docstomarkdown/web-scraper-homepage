import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts, categorySlug } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format-date";
import { Markdown } from "@/components/blog/Markdown";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ogImageUrl } from "@/lib/og";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post not found" };
    const href = `/blog/${post.slug}`;
    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: href },
        robots: post.status === "draft" ? { index: false, follow: false } : undefined,
        authors: [{ name: post.author.name, url: post.author.url }],
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            url: href,
            publishedTime: post.date,
            modifiedTime: post.updated,
            authors: [post.author.name],
            images: [{ url: post.image || ogImageUrl(post.title), width: 1200, height: 630, alt: post.imageAlt }],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();
    const related = getRelatedPosts(post);
    const base = siteConfig.url.replace(/\/$/, "");
    const href = `/blog/${post.slug}`;

    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <JsonLd
                data={[
                    {
                        "@type": "Article",
                        headline: post.title,
                        description: post.description,
                        datePublished: post.date,
                        dateModified: post.updated,
                        author: { "@type": "Person", name: post.author.name, url: post.author.url },
                        publisher: { "@type": "Organization", name: "Thinksolv Technologies", url: siteConfig.url },
                        mainEntityOfPage: `${base}${href}`,
                        ...(post.image ? { image: `${base}${post.image}` } : {}),
                    },
                    breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title, href }], base),
                ]}
            />
            <article className="max-w-[46rem] mx-auto px-6 md:px-12">
                <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
                    <Link href="/blog" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Blog</Link>
                    {post.category ? (
                        <>
                            {" / "}
                            <Link href={`/blog/category/${categorySlug(post.category)}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">
                                {post.category}
                            </Link>
                        </>
                    ) : null}
                </nav>
                {post.status === "draft" && (
                    <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
                        Draft: visible in local development only. Set <code>status: published</code> once it has been reviewed.
                    </p>
                )}
                <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{post.title}</h1>
                <p className="mt-5 text-lg text-slate-700 dark:text-slate-200 leading-[1.65]">{post.description}</p>
                <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
                    By <Link href={`/blog/author/${post.author.slug}`} className="font-medium text-slate-700 dark:text-slate-200 hover:underline">{post.author.name}</Link>
                    {" · "}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.updated && post.updated !== post.date ? <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></> : null}
                    {" · "}
                    {post.readingMinutes} min read
                </p>
                {post.image ? (
                    <figure className="mt-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.imageAlt} className="w-full h-auto rounded-2xl border border-slate-200 dark:border-slate-800" />
                    </figure>
                ) : null}
                <div className="mt-10">
                    <Markdown content={post.content} />
                </div>
                <aside className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{post.author.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{post.author.role}</p>
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{post.author.bio}</p>
                </aside>
            </article>
            {related.length > 0 ? (
                <section className="max-w-6xl mx-auto px-6 md:px-12 mt-20">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">More from the blog</h2>
                    <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((p) => (
                            <li key={p.slug}>
                                <PostCard post={p} />
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </main>
    );
}
