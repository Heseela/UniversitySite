"use server";

import { mediaSchema, TMediaSchema } from "@/schemas/media.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { media, TMediaSelect } from "@/db/schema/media";

export async function uploadMedia(values: TMediaSchema[]): Promise<TMediaSelect[]> {
    await checkAuth('admin');

    const { success, data, error } = mediaSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    return await db.insert(media).values(data).returning();
}