import { db } from "@/db";
import { media } from "@/db/schema/media";
import checkAuth from "@/lib/utilities/check-auth";
import { getPaginationQueryParams, paginatedResponse } from "@/lib/db-utils";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkAuth('admin');

        const searchParams = request.nextUrl.searchParams;
        const resource_type = searchParams.get('resource_type');
        const q = searchParams.get("q");
        const { page, pageSize } = getPaginationQueryParams(searchParams);

        const filters: SQL[] = [];

        if (q) filters.push(ilike(media.name, `%${q}%`));
        if (resource_type) filters.push(eq(media.resource_type, resource_type));

        const query = db
            .select({
                id: media.id,
                name: media.name,
                width: media.width,
                height: media.height,
                alt: media.alt,
                bytes: media.bytes,
                originalName: media.originalName,
                caption: media.caption,
                public_id: media.public_id,
                format: media.format,
                resource_type: media.resource_type,
                secure_url: media.secure_url,
                updatedAt: media.updatedAt,
            })
            .from(media)
            .where(and(...filters));

        const result = await paginatedResponse({
            qb: query.$dynamic(),
            orderByColumn: desc(media.updatedAt),
            page,
            pageSize
        });

        return Response.json(result);
    } catch (e) {
        if (e instanceof Error) {
            return Response.json({ error: e.message }, { status: 500 });
        }

        return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
