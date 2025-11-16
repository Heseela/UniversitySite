"use server";

import { db } from "@/db";
import checkAuth from "../utilities/check-auth";
import { pages } from "@/db/schema/page";
import { and, eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { heroSectionDtoDefaultValues } from "@/schemas/hero-section.schema";
import { PageDtoSchema, TPageDto } from "@/schemas/page.schema";
import { HOME_SLUG } from "@/app/slugs";

export async function createNewPage() {
    await checkAuth(["admin", "moderator"]);

    const [page] = await db.insert(pages).values({
        name: "Untitled",
        slug: generateSlug("Untitled"),
        metadata: {
            title: "Untitled",
            description: "",
            keywords: [],
        },
        sections: [],
        heroSections: [
            heroSectionDtoDefaultValues
        ]
    }).returning({ id: pages.id });

    if (!page) throw new Error("Failed to create page");

    return { id: page.id };
}

export async function updatePage(id: string, values: TPageDto) {
    await checkAuth(["admin", "moderator"]);

    const { success, data, error } = PageDtoSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const slug = generateSlug(data.name, data.name.toLowerCase() === "untitled");

    // check if slug has taken
    const [existingPage] = await db.select({ id: pages.id }).from(pages)
        .where(and(eq(pages.slug, slug), not(eq(pages.id, id))))
        .limit(1);

    if (existingPage) {
        throw new Error("Conflict: A page with this slug already exists. Please choose a different name.");
    }

    await db.update(pages).set({ ...data, slug }).where(eq(pages.id, id));

    revalidatePath(slug === HOME_SLUG ? "/" : `/${slug}`);

    return { success: true };
}

export async function deletePage(id: string) {
    await checkAuth(["admin", "moderator"]);

    await db.delete(pages).where(eq(pages.id, id));

    revalidatePath(`/cms/pages`);
}