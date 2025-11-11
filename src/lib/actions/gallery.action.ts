"use server";

import { db } from "@/db";
import { galleriesTable } from "@/db/schema/gallery";
import checkAuth from "../utilities/check-auth";
import { eq, inArray } from "drizzle-orm";
import { media } from "@/db/schema/media";

export async function createGallery(categoryId: string) {
    await checkAuth("admin");

    // check if gallery exists
    const [existing] = await db.select({ id: galleriesTable.id }).from(galleriesTable).where(eq(galleriesTable.categoryId, categoryId)).limit(1);
    if (existing) return;

    await db.insert(galleriesTable).values({ categoryId });

}

export async function addMediaToGallery(galleryId: string, mediaIds: string[]) {
    await checkAuth("admin");

    await db.update(media).set({ galleryId }).where(inArray(media.id, mediaIds));
}