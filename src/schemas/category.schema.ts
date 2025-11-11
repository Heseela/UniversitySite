import { CategoryType } from "@/db/schema/category";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, { message: "Category Name is required" }).trim(),
  type: z.nativeEnum(CategoryType, {
    required_error: "Category Type is required",
  }),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
