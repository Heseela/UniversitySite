import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { COURSES_SLUG } from "@/app/slugs";
import { CourseCardSkeleton } from "@/components/site/course/course-card";
import CoursesContainer from "@/components/site/course/courses-container";
import CoursesSearchFilters_Public from "@/components/site/course/courses-search-filters";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(COURSES_SLUG);
  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
};

export default async function CoursesPage() {
  const page = await fetchPage(COURSES_SLUG);

  return (
    <>
      <RenderHero heroSections={page.heroSections} />

      <section className="container py-12">
        {/* Search Filters - No props needed now */}
        <Suspense fallback={<Skeleton className="h-12 max-w-md" />}>
          <CoursesSearchFilters_Public />
        </Suspense>

        {/* Courses Grid */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <CourseCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <CoursesContainer />
        </Suspense>
      </section>
    </>
  );
}