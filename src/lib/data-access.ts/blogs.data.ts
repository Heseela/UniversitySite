import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, eq, isNull, not } from "drizzle-orm";
import { cache } from "react";

export const getBlogBySlug_Public = cache(async (slug: string) => {
    const [blog] = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            summary: blogs.summary,
            content: blogs.content,
            publishedAt: blogs.publishedAt,
            keywords: blogs.keywords,
            coverImage: blogs.coverImage,
            length: blogs.length
        })
        .from(blogs)
        .where(and(eq(blogs.slug, slug), not(isNull(blogs.publishedAt))))
        .limit(1);

    return blog ?? null;
});