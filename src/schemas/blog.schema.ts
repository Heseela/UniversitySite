import { z } from "zod";
import { richTextDefaultValues, richTextSchema } from "./rich-text.schema";

export const blogSummarySchema = z
  .string({ required_error: "Summary is required" })
  .min(100, "Summary must be at least 200 characters")
  .max(1000, "Summary must be at most 1000 characters")
  .trim();

export const blogKeywordsSchema = z
  .array(z.string().max(50, "Keyword must be at most 50 characters").trim())
  .max(5, "You can add up to 5 keywords only");

export const blogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  summary: z.string().trim(), // before publishing, no need to validate length
  content: richTextSchema,
  coverImage: z.string().nullish(),
  keywords: blogKeywordsSchema,
  isFavourite: z.boolean(),
  publishedAt: z.date().nullish(),
  stats: z.object({
    characters: z.number().min(0),
    words: z.number().min(0),
  }),
  categoryId: z.string().uuid().nullish(),
});

export type TBlogSchema = z.infer<typeof blogSchema>;

export const blogFormDefaultValues: TBlogSchema = {
  title: "Untitled",
  summary: "",
  content: richTextDefaultValues,
  coverImage: undefined,
  keywords: [],
  isFavourite: false,
  publishedAt: null,
  stats: {
    characters: 0,
    words: 0,
  },
};
