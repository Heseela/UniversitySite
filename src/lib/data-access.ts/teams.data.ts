import { db } from "@/db";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import { TDataSearchParams } from "../../../types/global.types";
import { TeamResponse } from "../../../types/team.type";
import { teamTable, TTeamTableSelect } from "@/db/schema/team";

export async function getTeams(searchParams?: TDataSearchParams): Promise<TeamResponse | null> {
    const urlSearchParams = new URLSearchParams(searchParams);

    const q = urlSearchParams.get("q");

    const filters: SQL[] = [];
    if (q) filters.push(ilike(teamTable.name, `%${q}%`));

    try {
        const foundTeams = await db
            .select({
                id: teamTable.id,
                name: teamTable.name,
                role: teamTable.role,
                updatedAt: teamTable.updatedAt,
                image: teamTable.image,
            })
            .from(teamTable)
            .where(and(...filters))
            .orderBy(desc(teamTable.createdAt));

        return foundTeams;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function getTeamById(id: string): Promise<TTeamTableSelect | null> {
    try {
        const [foundMember] = await db
            .select()
            .from(teamTable)
            .where(eq(teamTable.id, id))
            .limit(1);

        if (!foundMember) return null;

        return foundMember;
    } catch (e) {
        console.error(e);
        return null;
    }
}