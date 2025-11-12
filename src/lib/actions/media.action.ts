"use server";

import { mediaSchema, TMediaSchema } from "@/schemas/media.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { media, TMediaSelect } from "@/db/schema/media";
import z from "zod";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";

export async function uploadMedia(values: TMediaSchema[]): Promise<TMediaSelect[]> {
    await checkAuth('admin');

    const { success, data, error } = z.array(mediaSchema).safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const result = await db.insert(media).values(data).returning();

    revalidatePath("/cms/globals/media");
    
    return result;
}

export async function updateMedia(id: string, values: TMediaSchema) {
    await checkAuth('admin');

    const { success, data, error } = mediaSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    await db.update(media).set(data).where(eq(media.id, id));

    revalidatePath("/cms/globals/media");
}

/**
 * @params mediaIds - public_id not primary key `id`
 */
export async function deleteMedia(mediaIds: string[]) {
    await checkAuth("admin");

    await db.delete(media).where(inArray(media.public_id, mediaIds));

    revalidatePath(`/cms/globals/media`);
}