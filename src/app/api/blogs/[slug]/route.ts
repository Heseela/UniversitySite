import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { categories } from "@/db/schema/category";
import { and, eq, isNull, not } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

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
            length: blogs.length,
            categoryName: categories.name,
            author: blogs.author
        })
        .from(blogs)
        .where(and(eq(blogs.slug, slug), not(isNull(blogs.publishedAt))))
        .leftJoin(categories, eq(categories.id, blogs.categoryId))
        .limit(1);

    return NextResponse.json(blog ?? null);
}