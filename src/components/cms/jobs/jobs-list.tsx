import { DataTable } from "@/components/data-table/data-table";
import { JobsPageProps } from "@/app/(cms)/cms/jobs/page";
import { db } from "@/db";
import { jobsTable } from "@/db/schema/jobs";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import { jobsColumns } from "./job-column";

export default async function JobsList({
  searchParams,
}: {
  searchParams: JobsPageProps["searchParams"];
}) {
  const { q, department, type, status } = searchParams;

  const filters: SQL[] = [];

  if (q) {
    filters.push(ilike(jobsTable.title, `%${q}%`));
  }

  if (department) {
    filters.push(ilike(jobsTable.department, `%${department}%`));
  }

  if (type) {
    filters.push(eq(jobsTable.type, type as any)); 
  }

  if (status) {
    filters.push(eq(jobsTable.status, status as any)); 
  }

  const foundJobs = await db
    .select({
      id: jobsTable.id,
      title: jobsTable.title,
      department: jobsTable.department,
      type: jobsTable.type,
      status: jobsTable.status,
    })
    .from(jobsTable)
    .where(and(...filters))
    .orderBy(desc(jobsTable.updatedAt));

  return (
    <>
      <DataTable columns={jobsColumns} data={foundJobs} />

      <section className="mt-4">
        <span className="text-sm text-muted-foreground">
          {foundJobs.length} Job(s)
        </span>
      </section>
    </>
  );
}