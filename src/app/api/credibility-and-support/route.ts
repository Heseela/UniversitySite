import { db } from "@/db";
import {
  credibilityAndSupportTable,
  TCredibilityAndSupportTableSelect,
} from "@/db/schema/credibility-and-support";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
   const searchParams = request.nextUrl.searchParams;

  const column = searchParams.get("col");

  const isValidColumn =
    column && Object.keys(credibilityAndSupportTable).includes(column);

  if (!isValidColumn) throw new Error("Please provide valid column");

  const [cas] = await db
    .select({
      [column]:
        credibilityAndSupportTable[
          column as keyof TCredibilityAndSupportTableSelect
        ],
    })
    .from(credibilityAndSupportTable)
    .limit(1);

  return NextResponse.json(cas);
};
