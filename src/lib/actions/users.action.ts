"use server";

import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { TUserFormSchema, userFormSchema } from "@/schemas/users.schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createUser(values: TUserFormSchema) {
    await checkAuth(["admin"]);

    const { success, data, error } = userFormSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    await db.insert(users).values(data);

    revalidatePath("/cms/users")
}

export async function deleteUser(id: string) {
    await checkAuth(["admin"]);

    await db.delete(users).where(eq(users.id, id));

    revalidatePath("/cms/users")
}