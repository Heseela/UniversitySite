import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { coursesTable } from "@/db/schema/courses";
import { eq, } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [blog] = await db
        .select({
            id: coursesTable.id,
            name: coursesTable.name,
            slug: coursesTable.slug,
            summary: coursesTable.summary,
            description: coursesTable.description,
            duration: coursesTable.duration,
            degree: coursesTable.degree,
            faculty: coursesTable.faculty,
            eligibility: coursesTable.eligibility,
            coverImage: coursesTable.coverImage,
            updatedAt: coursesTable.updatedAt,
        })
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

    return NextResponse.json(blog ?? null);
}