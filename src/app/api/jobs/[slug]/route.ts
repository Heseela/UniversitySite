import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { jobsTable } from "@/db/schema/jobs";
import { eq, } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [blog] = await db
        .select({
            id: jobsTable.id,
            title: jobsTable.title,
            slug: jobsTable.slug,
            status: jobsTable.status,
            type: jobsTable.type,
            description: jobsTable.description,
            department: jobsTable.department,
            updatedAt: jobsTable.updatedAt,
        })
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

    return NextResponse.json(blog ?? null);
}