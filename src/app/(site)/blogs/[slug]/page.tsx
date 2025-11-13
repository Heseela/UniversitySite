import { BlogCardSkeleton } from "@/components/site/blogs/blog-card";
import RelatedBlogs from "@/components/site/blogs/related-blogs";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/db";
import { blogs, TBlogTableSelect } from "@/db/schema/blog";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import BlogHero from "@/components/site/blogs/blog-hero";
import { isNull, not } from "drizzle-orm";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { notFound } from "next/navigation";
import { TBlogsResponse_Public } from "../../../../../types/blog.types";

type BlogPostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;

  const res = await serverFetch(`/blogs/${slug}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return {
      title: "Blog Post Not Found",
      description:
        "Read our latest blog post on educational insights and resources.",
    };
  }

  const blog: TBlogTableSelect | null = await res.json();

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description:
        "Read our latest blog post on educational insights and resources.",
    };
  }

  return {
    title: blog?.title,
    description:
      blog?.summary ||
      "Read our latest blog post on educational insights and resources.",
    keywords: blog?.keywords || [],
  };
}

export default async function SingleBlogPage({ params }: BlogPostProps) {
  const { slug } = await params;

  const res = await serverFetch(`/blogs/${slug}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) notFound();

  const blog: TBlogsResponse_Public[0] | null = await res.json();

  if (!blog) notFound();

  return (
    <>
      <BlogHero {...blog} />

      {/* Blog Content */}
      <section className="py-8 md:py-12 md:mt-0 mt-[200px] bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10"></div>

            <p className="text-lg leading-relaxed mb-6">{blog.summary}</p>

            <RichTextPreview html={blog.content.html} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <Suspense
        fallback={Array.from({ length: 3 }, (_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      >
        <RelatedBlogs slug={slug} />
      </Suspense>
    </>
  );
}

export const generateStaticParams = async () => {
  try {
    const foundBlogs = await db.select({ slug: blogs.slug }).from(blogs).where(not(isNull(blogs.publishedAt)));
    return foundBlogs.map((blog) => ({ slug: blog.slug }));
  } catch (e) {
    console.log(e);
    return [];
  }
};
