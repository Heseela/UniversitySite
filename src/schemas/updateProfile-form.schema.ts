import { z } from "zod";

export const updateProfileFormSchema = z.object({
    name: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "Name must contain only letters and spaces",
    }).min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    image: z.string().nullish(),
});

export type UpdateProfileFormSchemaType = z.infer<typeof updateProfileFormSchema>;