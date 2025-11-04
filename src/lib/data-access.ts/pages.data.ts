import { db } from "@/db";
import { TPagesResponse } from "../../../types/page.types";
import { pages } from "@/db/schema/page";
import { and, desc, ilike, SQL } from "drizzle-orm";
import { getPaginationQueryParams, paginatedResponse } from "../db-utils";
import { TDataSearchParams } from "../../../types/global.types";

export async function getPages(searchParams?: TDataSearchParams): Promise<TPagesResponse | null> {
    const urlSearchParams = new URLSearchParams(searchParams);

    const { page, pageSize } = getPaginationQueryParams(urlSearchParams);
    const q = urlSearchParams.get("q");

    const filters: SQL[] = [];
    if (q) filters.push(ilike(pages.name, `%${q}%`));

    try {
        const query = db
            .select({
                id: pages.id,
                name: pages.name,
                slug: pages.slug,
                createdAt: pages.createdAt,
                updatedAt: pages.updatedAt
            })
            .from(pages)
            .where(and(...filters));

        const foundPages = await paginatedResponse({
            orderByColumn: desc(pages.createdAt),
            qb: query.$dynamic(),
            page,
            pageSize
        });

        return foundPages;
    } catch (e) {
        console.error(e);
        return null;
    }
}