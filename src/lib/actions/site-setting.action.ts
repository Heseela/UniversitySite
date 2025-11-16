"use server";

import { siteSettingSchema, TSiteSettingSchema } from "@/schemas/site-setting.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { siteSetting } from "@/db/schema/site-setting";
import { eq } from "drizzle-orm";

export async function updateSiteSetting(id: string, values: TSiteSettingSchema) {
    await checkAuth(["admin", "moderator"]);

    const { success, data, error } = siteSettingSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    // get existing setting
    const [existing] = await db.select({ id: siteSetting.id }).from(siteSetting).where(eq(siteSetting.id, id)).limit(1);
    if (!existing) throw new Error("Setting not found. Please seed the database first.");

    // update setting
    await db.update(siteSetting).set(data).where(eq(siteSetting.id, id));
}

