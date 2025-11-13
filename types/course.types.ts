import { TCourseTableSelect } from "@/db/schema/courses";

export type TCoursesResponse = Pick<
TCourseTableSelect,
  "id" | "name" | "slug" | "duration" | "degree" | "faculty"
>[];

export type TCoursesResponse_Public = (Pick<
    TCourseTableSelect,
  | "id"
  | "name"
  | "slug"
  | "summary"
  | "coverImage"
  | "duration"
  | "degree"
  | "faculty"
  | "eligibility"
  | "updatedAt"
> & { categoryName?: string })[];

export type TCourseTableData = {
  id: string;
  name: string;
  slug: string;
  duration: number;
  degree: string;
  faculty: string;
};