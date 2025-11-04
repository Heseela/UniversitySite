import { pgTable, text, integer, index, uniqueIndex, jsonb, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { TMediaSchema } from "@/schemas/media.schema";
import { EAcademicDegree, EAcademicFaculty } from "@/schemas/courses.schema";
import { IRichTextSchema } from "@/schemas/rich-text.schema";

export const academicDegreeEnum = pgEnum("academic_degree", EAcademicDegree);
export const academicFacultyEnum = pgEnum("academic_faculty", EAcademicFaculty);

export const coursesTable = pgTable("courses", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    summary: text("summary").notNull(),
    description: jsonb("description").$type<IRichTextSchema>().notNull(),
    coverImage: jsonb("coverImage").$type<TMediaSchema>(),
    duration: integer("duration").notNull(), // in years
    degree: academicDegreeEnum("degree").notNull(),
    faculty: academicFacultyEnum("faculty").notNull(),
    eligibility: text("eligibility").notNull(),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => ({
    nameIdx: index("course_name_idx").on(table.name),
    slugUniqueIdx: uniqueIndex("course_slug_unique_idx").on(table.slug),
    degreeIdx: index("course_degree_idx").on(table.degree),
    facultyIdx: index("course_faculty_idx").on(table.faculty),
}));

export type TCourseTableSelect = typeof coursesTable.$inferSelect;