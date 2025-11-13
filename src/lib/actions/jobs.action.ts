"use server";

import { jobSchema, TJobSchemaType } from "@/schemas/job.schema";
import checkAuth from "../utilities/check-auth";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { and, eq, not } from "drizzle-orm";
import { jobsTable } from "@/db/schema/jobs";

export async function createJob(values: TJobSchemaType) {
    await checkAuth("admin");

    const { success, data, error } = jobSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const inserted = await db
        .insert(jobsTable)
        .values({
            ...data,
            slug: generateSlug(data.title || 'Untitled'),
        })
        .returning({ id: jobsTable.id });

    if (inserted.length === 0) throw new Error("Failed to create job");

    return { id: inserted[0].id };
}

export async function updateJob(id: string, values: TJobSchemaType) {
    await checkAuth("admin");

    const { success, data, error } = jobSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const slug = generateSlug(data.title);

    // check if slug has taken
    const [existingJob] = await db
        .select({ id: jobsTable.id })
        .from(jobsTable)
        .where(and(eq(jobsTable.slug, slug), not(eq(jobsTable.id, id))))
        .limit(1);

    if (existingJob) {
        throw new Error("Conflict: A job with this slug already exists. Please choose a different name.");
    }

    await db.update(jobsTable).set(data).where(eq(jobsTable.id, id));
}

export async function deleteJob(id: string) {
    await checkAuth("admin");

    await db.delete(jobsTable).where(eq(jobsTable.id, id));
}