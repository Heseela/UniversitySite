"use server"

import { db } from "@/db";
import getSession from "../getSession";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { updateProfileFormSchema, UpdateProfileFormSchemaType } from "@/schemas/updateProfile-form.schema";

export async function updateProfile(values: UpdateProfileFormSchemaType, newUser: boolean = false) {
    const session = await getSession();

    const { success, error } = updateProfileFormSchema.safeParse(values);

    if (!success) {
        throw new Error(error.message);
    }

    if (!session || !session.user.id) {
        throw new Error("User not authenticated");
    }

    if (newUser && session.user.profileCompleted) {
        // If the user already has a profile, redirect to the profile page
        throw new Error("Profile already completed");
    }

    // update user in db
    await db.update(users)
        .set({
            ...values,
            profileCompleted: true,
        })
        .where(eq(users.id, session.user.id));
}