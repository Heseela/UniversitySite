import { db } from "@/db";
import { SQL } from "drizzle-orm";
import { PgColumn, PgSelect } from "drizzle-orm/pg-core";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

type WithPaginationProps<T> = {
  qb: T;
  orderByColumn: PgColumn | SQL | SQL.Aliased;
  page?: number;
  pageSize?: number;
};

export async function paginatedResponse<T extends PgSelect>({
  qb,
  orderByColumn,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
}: WithPaginationProps<T>) {
  const count = await db.$count(qb);

  const data = await qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const pageCount = Math.ceil(count / pageSize);

  const meta = {
    page,
    pageSize,
    itemCount: count,
    pageCount,
    hasPreviousPage: page > 1,
    hasNextPage: page < pageCount,
  };

  return {
    data,
    meta,
  };
}

export function getPaginationQueryParams(searchParams: URLSearchParams) {
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");
  const parsedPage = pageParam ? parseInt(pageParam) : DEFAULT_PAGE;
  const parsedPageSize = pageSizeParam
    ? parseInt(pageSizeParam)
    : DEFAULT_PAGE_SIZE;

  const page = isNaN(parsedPage) ? DEFAULT_PAGE : parsedPage;
  const pageSize = isNaN(parsedPageSize)
    ? DEFAULT_PAGE_SIZE
    : parsedPageSize > MAX_PAGE_SIZE
    ? MAX_PAGE_SIZE
    : parsedPageSize;

  return {
    page,
    pageSize,
  };
}
