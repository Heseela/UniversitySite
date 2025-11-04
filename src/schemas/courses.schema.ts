import z from "zod";
import { mediaSchema } from "./media.schema";
import { richTextDefaultValues, richTextSchema } from "./rich-text.schema";

export enum EAcademicDegree {
    Post_Graduate = 'post_graduate',
    Graduate = 'graduate',
    Undergraduate = 'undergraduate',
    PhD = 'phd',
}

export enum EAcademicFaculty {
    Science = 'science',
    Management = 'management',
    Arts = 'arts',
    Humanity = 'humanity',
    Law = 'law',
    Other = 'other',
}

export const courseSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    summary: z.string().min(1, { message: "Summary is required" }),
    description: richTextSchema,
    coverImage: mediaSchema.nullish(),
    duration: z.coerce.number().int({ message: "Duration must be an integer (in years)" }).positive({ message: "Duration must be positive" }),
    degree: z.nativeEnum(EAcademicDegree, {
        message: "Degree must be one of the allowed values"
    }),
    faculty: z.nativeEnum(EAcademicFaculty, {
        message: "Faculty must be one of the allowed values"
    }),
    eligibility: z.string().min(1, { message: "Eligibility description is required" }),
});

export type TCourseSchema = z.infer<typeof courseSchema>;

export const courseFormDefaultValues: TCourseSchema = {
    name: "",
    summary: "",
    description: richTextDefaultValues,
    coverImage: null,
    duration: 1,
    degree: EAcademicDegree.Undergraduate,
    faculty: EAcademicFaculty.Science,
    eligibility: "",
};