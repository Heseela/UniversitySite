import { db } from "@/db";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ public_id: string }> }) {
    const { public_id } = await params;

    const [foundMedia] = await db.select().from(media).where(eq(media.public_id, public_id)).limit(1);

    if (!foundMedia) {
        return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json(foundMedia);
}