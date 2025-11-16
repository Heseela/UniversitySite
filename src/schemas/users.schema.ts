import z from "zod";

export const userFormSchema = z.object({
    name: z.string().max(50, {
        message: "Name must be at most 50 characters long"
    }),
    role: z.enum(["admin", "user", "moderator"]),
    email: z.string().email({
        message: "Invalid email address"
    }),
});

export type TUserFormSchema = z.infer<typeof userFormSchema>;

export const userFormDefaultValues: TUserFormSchema = {
    name: "",
    role: "moderator",
    email: "",
}