import { db } from "@/db";
import { forms } from "@/db/schema/form";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [form] = await db
        .select({
            id: forms.id,
            title: forms.title,
            slug: forms.slug,
            fields: forms.fields,
            submitBtnLabel: forms.submitBtnLabel,
        })
        .from(forms)
        .where(eq(forms.id, id))
        .limit(1);

    return NextResponse.json(form ?? null);
}


