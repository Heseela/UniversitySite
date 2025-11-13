import { db } from "@/db";
import { media } from "@/db/schema/media";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import { paginatedResponse } from "../db-utils";
import { TMediaResponse } from "../../../types/media.types";

type QueryParams = {
    q?: string | undefined;
    resource_type?: string | undefined;
    page?: number;
    pageSize?: number;
} & Record<string, string | number | undefined>;

export async function getMedia(queryParams: QueryParams): Promise<TMediaResponse> {
    const filters: SQL[] = [];

    const { q, resource_type, page, pageSize } = queryParams;

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

    return paginatedResponse({
        qb: query.$dynamic(),
        orderByColumn: desc(media.updatedAt),
        page,
        pageSize,
    });
}