import { db } from "@/db";
import { teamTable } from "@/db/schema/team";
import { and, asc, desc, ilike, inArray, SQL } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const q = searchParams.get("q");
  const limit = searchParams.get("limit");
  const ids = searchParams.get("ids")?.split(",") || [];
  const filters: SQL[] = [];
  if (q) filters.push(ilike(teamTable.name, `%${q}%`));

  if (ids.length > 0) filters.push(inArray(teamTable.id, ids));

  const foundTeams = await db
    .select({
      id: teamTable.id,
      name: teamTable.name,
      role: teamTable.role,
      description: teamTable.description,
      updatedAt: teamTable.updatedAt,
      image: teamTable.image,
      socialLinks: teamTable.socialLinks,
    })
    .from(teamTable)
    .where(and(...filters))
    .orderBy(asc(teamTable.createdAt))
    .limit(+(limit ?? 100))

  return NextResponse.json(foundTeams);
}
