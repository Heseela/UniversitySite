import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [page] = await db
        .select({
            id: pages.id,
            name: pages.name,
            slug: pages.slug,
            metadata: pages.metadata,
            sections: pages.sections,
            heroSections: pages.heroSections
        })
        .from(pages)
        .where(and(eq(pages.slug, slug)))
        .limit(1);

    return NextResponse.json(page ?? null);
}