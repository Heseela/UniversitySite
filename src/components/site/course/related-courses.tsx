// components/site/courses/related-courses.tsx
import { TCoursesResponse_Public } from "../../../../types/course.types";
import CourseCard from "./course-card";

type Props = {
  courses: TCoursesResponse_Public;
  currentCourseSlug: string;
};

export default function RelatedCourses({ courses, currentCourseSlug }: Props) {
  const relatedCourses = courses
    .filter(course => course.slug !== currentCourseSlug)
    .slice(0, 3);

  if (relatedCourses.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}