"use server";

import { teamSchema, TTeamDto } from "@/schemas/team.schema";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { db } from "@/db";
import { teamTable } from "@/db/schema/team";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createTeam = async (values: TTeamDto) => {
    await checkAuth(["admin", "moderator"]);

    const { success, data, error } = teamSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    await db.insert(teamTable).values(data);
    revalidatePath(`/cms/teams`);
};

export const updateTeam = async (id: string, values: TTeamDto) => {
    await checkAuth(["admin", "moderator"]);

    const { success, data, error } = teamSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const [existing] = await db.select({ id: teamTable.id }).from(teamTable).where(eq(teamTable.id, id)).limit(1);
    if (!existing) throw new Error("Member not found");

    await db.update(teamTable).set(data).where(eq(teamTable.id, id));
};

export const deleteTeam = async (id: string) => {
    await checkAuth(["admin", "moderator"]);
    await db.delete(teamTable).where(eq(teamTable.id, id));
    revalidatePath(`/cms/teams`);
};
