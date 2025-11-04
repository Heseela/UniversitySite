import { BlogCardSkeleton } from "@/components/site/blogs/blog-card";
import RelatedBlogs from "@/components/site/blogs/related-blogs";
import { Button } from "@/components/ui/button";
import YooptaEditorReadonly from "@/components/yoopta-editor/readonly";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TBlog } from "../../../../../types/blog.types";
import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import BlogHero from "@/components/site/blogs/blog-hero";
import { isNull, not } from "drizzle-orm";

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

  const blog: TBlog = await res.json();

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

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link href="/blogs" className="btn btn-primary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const blog: TBlog = await res.json();

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p>
            This can also happen if the author has updated the blog. You can
            checkout later.
          </p>
          <Button type="button" asChild variant={"link"}>
            <Link href="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogHero {...blog} />

      {/* Blog Content */}
      <section className="py-8 md:py-12 md:mt-0 mt-[200px] bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10"></div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">{blog.summary}</p>

              <YooptaEditorReadonly value={blog.content} />
            </div>
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
