"use server";

import { db } from "@/db";
import { galleriesTable } from "@/db/schema/gallery";
import checkAuth from "../utilities/check-auth";
import { eq, inArray } from "drizzle-orm";
import { media } from "@/db/schema/media";
import { revalidatePath } from "next/cache";

export async function createGallery(categoryId: string) {
    await checkAuth(["admin", "moderator"]);

    // check if gallery exists
    const [existing] = await db.select({ id: galleriesTable.id }).from(galleriesTable).where(eq(galleriesTable.categoryId, categoryId)).limit(1);
    if (existing) return;

    await db.insert(galleriesTable).values({ categoryId });

}

export async function addMediaToGallery(galleryId: string, mediaIds: string[]) {
    console.log(1)
    await checkAuth(["admin", "moderator"]);

    await db.update(media).set({ galleryId }).where(inArray(media.id, mediaIds));

    revalidatePath(`/cms/gallery`);
}

export async function removeMediaFromGallery(mediaIds: string[]) {
    await checkAuth(["admin", "moderator"]);

    await db.update(media).set({ galleryId: null }).where(inArray(media.id, mediaIds));

    revalidatePath(`/cms/gallery`);
}