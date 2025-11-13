"use server";

import { courseSchema, TCourseSchema } from "@/schemas/courses.schema";
import checkAuth from "../utilities/check-auth";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { coursesTable } from "@/db/schema/courses";
import { and, eq, not } from "drizzle-orm";

export async function createCourse(values: TCourseSchema) {
    await checkAuth("admin");

    const { success, data, error } = courseSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const inserted = await db
        .insert(coursesTable)
        .values({
            ...data,
            slug: generateSlug(data.name || 'Untitled'),
        })
        .returning({ id: coursesTable.id });

    if (inserted.length === 0) throw new Error("Failed to create course");

    return { id: inserted[0].id };
}

export async function updateCourse(id: string, values: TCourseSchema) {
    await checkAuth("admin");

    const { success, data, error } = courseSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const slug = generateSlug(data.name);

    // check if slug has taken
    const [existingCourse] = await db
        .select({ id: coursesTable.id })
        .from(coursesTable)
        .where(and(eq(coursesTable.slug, slug), not(eq(coursesTable.id, id))))
        .limit(1);

    if (existingCourse) {
        throw new Error("Conflict: A course with this slug already exists. Please choose a different name.");
    }

    await db.update(coursesTable).set(data).where(eq(coursesTable.id, id));
}

export async function deleteCourse(id: string) {
    await checkAuth("admin");

    await db.delete(coursesTable).where(eq(coursesTable.id, id));
}