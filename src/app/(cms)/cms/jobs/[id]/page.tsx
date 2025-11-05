import JobForm from "@/components/cms/jobs/job-form";
import { db } from "@/db";
import { jobsTable } from "@/db/schema/jobs";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateJobPage({ params }: Props) {
  const { id } = await params;

  const [job] = await db
    .select()
    .from(jobsTable)
    .where(eq(jobsTable.id, id));

  if (!job) {
    return notFound();
  }

  return (
    <JobForm
      defaultValues={job}
    />
  );
}