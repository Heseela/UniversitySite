import { DataTable } from "@/components/data-table/data-table";
import { CoursesPageProps } from "@/app/(cms)/cms/courses/page";
import { db } from "@/db";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { coursesColumns } from "./course-column";
import { coursesTable } from "@/db/schema/courses";

export default async function CoursesList({
  searchParams,
}: {
  searchParams: CoursesPageProps["searchParams"];
}) {
  const { q } = searchParams;

  const filters: SQL[] = [];

  if (q) filters.push(ilike(coursesTable.name, `%${q}%`));

  const foundCourses = await db
    .select({
      id: coursesTable.id,
      name: coursesTable.name,
      slug: coursesTable.slug,
      duration: coursesTable.duration,
      degree: coursesTable.degree,
      faculty: coursesTable.faculty,
    })
    .from(coursesTable)
    .where(and(...filters))
    .orderBy(desc(coursesTable.updatedAt));

  return (
    <>
      <DataTable columns={coursesColumns} data={foundCourses} />

      <section>
        <span className="text-sm text-muted-foreground">
          {foundCourses.length} Course(s)
        </span>
      </section>
    </>
  );
}