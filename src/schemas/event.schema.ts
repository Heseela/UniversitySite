import { z } from "zod";
import { richTextDefaultValues } from "./rich-text.schema";
import { mediaSchema } from "./media.schema";

export const eventSummarySchema = z
  .string({ required_error: "Summary is required" })
  .min(200, "Summary must be at least 200 characters")
  .max(1000, "Summary must be at most 1000 characters")
  .trim();

export const eventKeywordsSchema = z
  .array(z.string().max(50, "Keyword must be at most 50 characters").trim())
  .max(5, "You can add up to 5 keywords only");

export const eventSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).trim(),
  summary: z.string().min(1, { message: "Summary is required" }).trim(),
  content: z.any(),
  coverImage: mediaSchema.nullish(),
  categoryId: z.string().uuid(),
  categoryName: z.string().optional(),
  eventDate: z.date(),
  venue: z.string().max(100, "Venue must be at most 100 characters").trim(),
  capacity: z.coerce.number().min(0).nullish(),
});

export type eventSchemaType = z.infer<typeof eventSchema>;

export const eventFormDefaultValues: eventSchemaType = {
  title: "Untitled",
  summary: "",
  content: richTextDefaultValues,
  coverImage: undefined,
  eventDate: new Date(),
  categoryId: "",
  venue: "",
  capacity: 0,
};
