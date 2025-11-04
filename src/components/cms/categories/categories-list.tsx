import { CategoriesPageProps } from "@/app/(cms)/cms/categories/page";
import { DataTable } from "@/components/data-table/data-table";
import { db } from "@/db";
import { categories, CategoryType } from "@/db/schema/category";
import { and, eq, ilike, sql, SQL } from "drizzle-orm";
import { categoriesColumns } from "./category-column";
import CategoriesSearchFilters from "./categories-search";

export default async function CategoriesList({
  searchParams,
}: {
  searchParams: CategoriesPageProps["searchParams"];
}) {
  const { q, type } = searchParams;

  const filters: SQL[] = [];

  if (q) filters.push(ilike(categories.name, `%${q}%`));
  if (type) filters.push(eq(categories.type, type as CategoryType));

  const foundCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      type: categories.type,
    })
    .from(categories)
    .where(and(...filters))
    .orderBy(sql`lower(${categories.name})`);

  return (
    <>
      <CategoriesSearchFilters />

      <DataTable columns={categoriesColumns} data={foundCategories} />

      <section>
        <span className="text-sm text-muted-foreground">
          {foundCategories.length} Catagories(s)
        </span>
      </section>
    </>
  );
}
