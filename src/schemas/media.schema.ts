import { z } from "zod";

export const mediaSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be at most 50 characters long" }),
    originalName: z.string({ required_error: "Please select a media" }).min(3, { message: "Original name must be at least 3 characters long" }).max(50, { message: "Original name must be at most 50 characters long" }),
    alt: z.string({ required_error: "Alt text is required" }).max(100, { message: "Alt text must be at most 100 characters long" }),
    caption: z.string().max(100, { message: "Caption must be at most 100 characters long" }),

    public_id: z.string().min(1, { message: "Public id is required" }),
    secure_url: z.string().url().min(1, { message: "Secure url is required" }),
    width: z.number().min(1, { message: "Width is required" }),
    height: z.number().min(1, { message: "Height is required" }),
    format: z.string(),
    resource_type: z.string(),
    bytes: z.number().min(1, { message: "Bytes is required" }),
});

export type TMediaSchema = z.infer<typeof mediaSchema>;