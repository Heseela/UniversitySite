import ContainerLayout from "@/components/cms/container-layout";
import CoursesList from "@/components/cms/courses/courses-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Courses",
};

export type CoursesPageProps = {
  searchParams: {
    q?: string;
    faculty?: string;
    degree?: string;
    limit?: string;
  };
};

export default async function CoursesPage(props: {
  searchParams: Promise<CoursesPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;

  return (
    <ContainerLayout
      title="Courses"
      description="Manage your academic courses here."
      actionTrigger={
        <Button asChild>
          <Link href="/cms/courses/new">
            <Plus /> New Course
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading courses...</div>}>
        <CoursesList searchParams={searchParams} />
      </Suspense>
    </ContainerLayout>
  );
}