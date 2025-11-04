import { db } from "@/db";
import { asc, desc, eq, ilike, inArray, SQL } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { EOrder } from "../../../../types/global.types";
import { coursesTable } from "@/db/schema/courses";
import { EAcademicDegree, EAcademicFaculty } from "@/schemas/courses.schema";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const slugs = searchParams.get("slugs")?.split(",") || [];
    const order = searchParams.get("order") || EOrder.Desc;
    const degree = searchParams.get("degree");
    const faculty = searchParams.get("faculty");

    const filters: SQL[] = [];

    if (q) filters.push(ilike(coursesTable.name, `%${q}%`));
    if (slugs.length) filters.push(inArray(coursesTable.slug, slugs));
    if (degree) filters.push(eq(coursesTable.degree, degree as EAcademicDegree));
    if (faculty) filters.push(eq(coursesTable.faculty, faculty as EAcademicFaculty));

    const foundCourses = await db
        .select({
            id: coursesTable.id,
            name: coursesTable.name,
            slug: coursesTable.slug,
            summary: coursesTable.summary,
            duration: coursesTable.duration,
            degree: coursesTable.degree,
            faculty: coursesTable.faculty,
            eligibility: coursesTable.eligibility,
            coverImage: coursesTable.coverImage,
            updatedAt: coursesTable.updatedAt,
        })
        .from(coursesTable)
        .orderBy(
            order === EOrder.Asc ? asc(coursesTable.createdAt) : desc(coursesTable.createdAt)
        )
        .limit(Number(limit) || 100); // TODO: this should not be hardcoded

    return NextResponse.json(foundCourses);
}
