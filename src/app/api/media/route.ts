import checkAuth from "@/lib/utilities/check-auth";
import { getPaginationQueryParams } from "@/lib/db-utils";
import { NextRequest } from "next/server";
import { getMedia } from "@/lib/data-access.ts/media.data";

export async function GET(request: NextRequest) {
    try {
        await checkAuth(["admin", "moderator"]);

        const searchParams = request.nextUrl.searchParams;
        const resource_type = searchParams.get('resource_type') || undefined;
        const q = searchParams.get("q") || undefined;
        const { page, pageSize } = getPaginationQueryParams(searchParams);

        const result = await getMedia({
            page,
            pageSize,
            q,
            resource_type
        });

        return Response.json(result);
    } catch (e) {
        if (e instanceof Error) {
            return Response.json({ error: e.message }, { status: 500 });
        }

        return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}