// import { db } from "@/db";
// import { coursesTable } from "@/db/schema/courses";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request, 
//   { params }: { params: Promise<{ slug: string }> }
// ) {
//     const { slug } = await params;

//     const [course] = await db
//         .select({
//             id: coursesTable.id,
//             name: coursesTable.name,
//             slug: coursesTable.slug,
//             summary: coursesTable.summary,
//             description: coursesTable.description,
//             duration: coursesTable.duration,
//             degree: coursesTable.degree,
//             faculty: coursesTable.faculty,
//             eligibility: coursesTable.eligibility,
//             coverImage: coursesTable.coverImage,
//             updatedAt: coursesTable.updatedAt,
//         })
//         .from(coursesTable)
//         .where(eq(coursesTable.slug, slug))
//         .limit(1);

//     if (!course) {
//         return NextResponse.json(
//             { error: "Course not found" }, 
//             { status: 404 }
//         );
//     }

//     return NextResponse.json(course);
// }

import { db } from "@/db";
import { coursesTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const [course] = await db
        .select({
            id: coursesTable.id,
            name: coursesTable.name,
            slug: coursesTable.slug,
            summary: coursesTable.summary,
            description: coursesTable.description,
            duration: coursesTable.duration,
            degree: coursesTable.degree,
            faculty: coursesTable.faculty,
            eligibility: coursesTable.eligibility,
            coverImage: coursesTable.coverImage,
            updatedAt: coursesTable.updatedAt,
        })
        .from(coursesTable)
        .where(eq(coursesTable.slug, slug))
        .limit(1);

    if (!course) {
        return NextResponse.json(
            { error: "Course not found" }, 
            { status: 404 }
        );
    }

    return NextResponse.json(course);
}