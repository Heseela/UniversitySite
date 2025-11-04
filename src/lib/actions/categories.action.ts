"use server";

import { db } from "@/db";
import { categories } from "@/db/schema/category";
import checkAuth from "../utilities/check-auth";
import { throwZodErrorMsg } from "../utils";
import { categorySchema, CategorySchemaType } from "@/schemas/category.schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function createCategory(values: CategorySchemaType) {
  await checkAuth("admin");

  const { success, data, error } = categorySchema.safeParse(values);

  if (!success) throwZodErrorMsg(error);

  // check if category is duplicate
  const [existing] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      and(...[eq(categories.name, data.name), eq(categories.type, data.type)])
    );

  if (existing) throw new Error("Duplicate category");

  const inserted = await db
    .insert(categories)
    .values({ ...data })
    .returning({ id: categories.id });

  if (inserted.length === 0) throw new Error("Failed to create category");

  revalidatePath(`/cms/categories`);

  return { id: inserted[0].id };
}

export async function deleteCategory(id: string) {
  await checkAuth("admin");

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath(`/cms/categories`);
}

export async function updateCategory(
  id: string,
  values: Partial<CategorySchemaType>
) {
  await checkAuth("admin");

  const { success, data, error } = categorySchema.partial().safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const [existing] = await db
    .select({ name: categories.name, type: categories.type })
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  if (!existing) throw new Error("Category not found");

  const [duplicate] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(
      and(
        ...[
          eq(categories.name, data.name || existing.name),
          eq(categories.type, data.type || existing.type),
        ]
      )
    );

  if (duplicate) throw new Error("Duplicate category");

  await db
    .update(categories)
    .set({ ...data })
    .where(eq(categories.id, id));

  revalidatePath(`/cms/categories`);
}
