import { db } from "@/db";
import { jobsTable } from "@/db/schema/jobs";
import { desc } from "drizzle-orm";
import { cache } from "react";
export const getJobs = cache(async () => {
    const jobs = await db.select({
        id: jobsTable.id,
        title: jobsTable.title,
        slug: jobsTable.slug,
        department: jobsTable.department,
        type: jobsTable.type,
        status: jobsTable.status,
        updatedAt: jobsTable.updatedAt,
        createdAt: jobsTable.createdAt,
    }).from(jobsTable).orderBy(desc(jobsTable.createdAt));
    return jobs;
})