import { CategoryType } from "@/db/schema/category";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Category Name is required" }).trim(),
  type: z.enum([CategoryType.BLOG, CategoryType.EVENT], {
    required_error: "Category Type is required",
  }),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
