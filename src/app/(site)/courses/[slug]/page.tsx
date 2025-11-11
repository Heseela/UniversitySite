import CloudinaryImage from "@/components/ui/cloudinary-image";
import { Clock, Award, BookOpen, GraduationCap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { TCourseTableSelect, coursesTable } from "@/db/schema/courses";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { cn } from "@/lib/utils";
import { TCoursesResponse_Public } from "../../../../../types/course.types";
import CourseHero from "@/components/site/course/course-hero";
import RelatedCourses from "@/components/site/course/related-courses";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await serverFetch(`/courses/${slug}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return {
      title: "Course Not Found",
    };
  }

  const course: TCourseTableSelect = await res.json();

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course?.name,
    description: course?.summary || "Explore our comprehensive course offering.",
  };
}

export default async function SingleCoursePage({ params }: Props) {
  const { slug } = await params;

  const res = await serverFetch(`/courses/${slug}`, { 
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });
  
  if (!res.ok) {
    console.error('Course fetch failed:', res.status, await res.text());
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const course: TCourseTableSelect & { categoryName?: string } = await res.json();

  const relatedRes = await serverFetch(`/courses?faculty=${course.faculty}&limit=4`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });
  const relatedCourses: TCoursesResponse_Public = relatedRes.ok ? await relatedRes.json() : [];

  return (
    <>
      <CourseHero name={course.name} coverImage={course.coverImage} />

      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
          {/* Sidebar */}
          <div className="col-span-1 md:order-2 mb-6">
            <div
              className={cn(
                "grid grid-cols-1 gap-4 text-sm text-slate-500 mb-6",
                "[&>*]:p-5 [&>*]:border [&>*]:rounded-md [&>*]:shadow-sm [&>*]:w-full [&>*]:flex-col"
              )}
            >
              {/* Duration */}
              <div className="space-y-2">
                <Clock className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <span className="text-lg font-medium">{course.duration} years</span>
                </div>
              </div>

              {/* Degree */}
              <div className="space-y-2">
                <Award className="text-green-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Degree</p>
                  <span className="text-lg font-medium">{course.degree}</span>
                </div>
              </div>

              {/* Faculty */}
              <div className="space-y-2">
                <GraduationCap className="text-purple-500" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Faculty</p>
                  <span className="text-lg font-medium">{course.faculty}</span>
                </div>
              </div>

              {/* Category */}
              {course.categoryName && (
                <div className="space-y-2">
                  <BookOpen className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <span className="text-lg font-medium">{course.categoryName}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Eligibility */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Eligibility</h3>
              <p className="text-blue-800">{course.eligibility}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <div className="rounded-xl overflow-hidden mb-10 shadow-md">
              {course.coverImage && (
                <CloudinaryImage
                  src={course.coverImage?.secure_url}
                  alt={course.name}
                  className="w-full h-auto"
                  height={500}
                  width={800}
                />
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-gray-700">{course.summary}</p>
              <RichTextPreview html={course.description.html} />
            </div>
          </div>
        </div>
      </section>

      <RelatedCourses courses={relatedCourses} currentCourseSlug={course.slug} />
    </>
  );
}

export const generateStaticParams = async () => {
  try {
    const foundCourses = await db.select({ slug: coursesTable.slug }).from(coursesTable);
    return foundCourses.map((course) => ({ slug: course.slug }));
  } catch (e) {
    console.log(e);
    return [];
  }
};