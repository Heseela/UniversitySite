"use server";

import { credibilityAndSupportSchema, TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { credibilityAndSupportTable } from "@/db/schema/credibility-and-support";
import { eq } from "drizzle-orm";

export async function updateCredibilityAndSupport(id: string, values: TCredibilityAndSupport) {
    await checkAuth('admin');

    const { success, data, error } = credibilityAndSupportSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const [existing] = await db.select({ id: credibilityAndSupportTable.id }).from(credibilityAndSupportTable).where(eq(credibilityAndSupportTable.id, id)).limit(1);
    if (!existing) throw new Error("Data not found. Please seed the database first.");

    await db.update(credibilityAndSupportTable).set(data).where(eq(credibilityAndSupportTable.id, id));
}