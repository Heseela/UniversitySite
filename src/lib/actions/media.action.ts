"use server";

import { mediaSchema, TMediaSchema } from "@/schemas/media.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { media } from "@/db/schema/media";

export async function uploadMedia(values: TMediaSchema) {
    await checkAuth('admin');

    const { success, data, error } = mediaSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const [inserted] = await db.insert(media).values(data).returning({
        id: media.id,
        name: media.name,
        width: media.width,
        height: media.height,
        alt: media.alt,
        caption: media.caption,
        secure_url: media.secure_url,
        updatedAt: media.updatedAt,
    });

    return inserted;
}