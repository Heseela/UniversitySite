import { z } from "zod";
import { mediaSchema } from "./media.schema";

export const teamSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    image: mediaSchema.nullish(),
    role: z.string().min(1, { message: "Required" }),
    description: z.string(),
    socialLinks: z.array(z.object({
        link: z.string().url({ message: "Social link must be a valid URL" })
    })).max(5, { message: "You can add up to 5 social links" }),
});

export type TTeamDto = z.infer<typeof teamSchema>;

export const teamDefaultValue: TTeamDto = {
    name: "",
    image: null,
    role: "",
    description: "",
    socialLinks: [],
};