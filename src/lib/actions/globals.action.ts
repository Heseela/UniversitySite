"use server";

import { footerSchema, headerSchema, TFooterDto, THeaderDto } from "@/schemas/globals.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { footer, header } from "@/db/schema/globals";
import { eq } from "drizzle-orm";

export async function updateHeader(id: string, values: THeaderDto) {
    await checkAuth('admin');

    const { success, data, error } = headerSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    // get existing header
    const [existing] = await db.select({ id: header.id }).from(header).where(eq(header.id, id)).limit(1);
    if (!existing) throw new Error("Header not found. Please seed the database first.");

    // update header
    await db.update(header).set(data).where(eq(header.id, id));
}

export async function updateFooter(id: string, values: TFooterDto) {
    await checkAuth('admin');

    const { success, data, error } = footerSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    // get existing footer
    const [existing] = await db.select({ id: footer.id }).from(footer).where(eq(footer.id, id)).limit(1);
    if (!existing) throw new Error("Footer not found. Please seed the database first.");

    // update footer
    await db.update(footer).set(data).where(eq(footer.id, id));
}

