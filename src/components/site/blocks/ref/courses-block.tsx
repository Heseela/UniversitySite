import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import Link from "next/link";
import { TCoursesResponse_Public } from "../../../../../types/course.types";
import { Button } from "@/components/ui/button";
import { gridClassName } from ".";
import { cn } from "@/lib/utils";
import CourseCard from "../../course/course-card";

interface CoursesBlockProps extends RefItemBlockDto {
    refRelation: ERefRelation.Courses;
}

export default async function CoursesBlock({
    limit,
    order,
    selected,
    cols = 1
}: CoursesBlockProps) {
    const urlSearchParams = new URLSearchParams({
        limit: limit?.toString() || "10",
        order: order || "ASC",
    });

    if (selected?.length) {
        urlSearchParams.set("slugs", selected.map((s) => s.value).join(","));
    }

    const res = await serverFetch(`/courses?${urlSearchParams.toString()}`, {
        next: {
            revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC || "3600")
        },
    });

    if (!res.ok) return null;

    const courses: TCoursesResponse_Public = await res.json();

    if (!courses.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No courses found
            </div>
        );
    }

    return (
        <>
            <section className={cn(
                "grid gap-6",
                gridClassName[cols as keyof typeof gridClassName]
            )}>
                {courses.map((course) => {
                    return <CourseCard key={course.slug} course={course} />;
                })}
            </section>
            <div className="flex justify-center">
                <Button variant={"link"} asChild>
                    <Link className="text-primary  w-fit flex justify-center" href={"/courses"}>
                        View All Courses
                    </Link>
                </Button>
            </div>
        </>
    );
}