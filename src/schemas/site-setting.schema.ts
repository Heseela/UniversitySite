import { z } from "zod";
import { mediaSchema } from "./media.schema";

export const siteSettingSchema = z.object({
    logoLight: mediaSchema.nullish(),
    logoDark: mediaSchema.nullish(),
    emails: z.array(z.string().email()).max(3, { message: "You can add up to 3 emails" }),
    phones: z.array(z.string().min(10, { message: "Invalid phone number" }).max(15, { message: "Invalid phone number" })).max(3, { message: "You can add up to 3 phone numbers" }),
    address: z.string().min(1, { message: "Address is required" }),
    mapLink: z.string().refine((val) => {
        if (val?.length === 0) return true;
        return z.string().url().safeParse(val).success;
    }),
    socialLinks: z.array(z.object({
        link: z.string().url({ message: "Social link must be a valid URL" })
    })).max(5, { message: "You can add up to 5 social links" }),
});

export type TSiteSettingSchema = z.infer<typeof siteSettingSchema>;