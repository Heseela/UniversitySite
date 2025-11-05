import CourseForm from "@/components/cms/courses/course-form";
import { db } from "@/db";
import { coursesTable } from "@/db/schema/course";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateCoursePage({ params }: Props) {
  const { id } = await params;

  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, id));

  if (!course) {
    return notFound();
  }

  return (
    <CourseForm defaultValues={course} />
  );
}