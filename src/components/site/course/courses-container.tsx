// components/site/courses/courses-container.tsx
"use client";

import { TCoursesResponse_Public } from "../../../../types/course.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import CourseCard from "./course-card";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function CoursesContainer() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const searchQuery = searchParams.get("q");

  const { data, error } = useSuspenseQuery({
    queryKey: ["courses", queryString],
    queryFn: async () => {
      const url = `/courses${queryString ? `?${queryString}` : ''}`;
      const res = await serverFetch(url, {
        next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch courses: ${res.status}`);
      }

      const courses = await res.json() as TCoursesResponse_Public;
      return courses;
    }
  })

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Failed to Load Courses</h3>
        <p className="text-muted-foreground mb-6">Please try again later.</p>
      </div>
    );
  }

  // No courses at all
  if (data.length === 0 && !searchQuery) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">No Courses Available</h3>
        <p className="text-muted-foreground mb-6">
          There are no courses available at the moment.
        </p>
      </div>
    );
  }

  // Search returned no results
  if (searchQuery && data.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">No Courses Found</h3>
        <p className="text-muted-foreground mb-6">
          No courses found matching "<span className="font-semibold">{searchQuery}</span>".
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}