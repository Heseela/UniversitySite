"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { blogSchema, TBlogSchema } from "@/schemas/blog.schema";
import { eq } from "drizzle-orm";
import checkAuth from "../utilities/check-auth";
import { revalidatePath } from "next/cache";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { categories } from "@/db/schema/category";
import { richTextDefaultValues } from "@/schemas/rich-text.schema";

export async function createBlog(values: TBlogSchema) {
  const session = await checkAuth(["admin", "moderator"]);

  const { success, data, error } = blogSchema.partial().safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const inserted = await db
    .insert(blogs)
    .values({
      ...data,
      content: richTextDefaultValues,
      slug: generateSlug(data.title || 'Untitled'),
      author: session.user.name || "",
    })
    .returning({ id: blogs.id });

  if (inserted.length === 0) throw new Error("Failed to create blog");

  return { id: inserted[0].id };
}

export async function updateBlog(
  id: string,
  values: Partial<TBlogSchema>,
  contentEdited: boolean = true
) {
  await checkAuth(["admin", "moderator"]);

  const { success, data, error } = blogSchema.partial().safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const existing = await db
    .select({
      title: blogs.title,
      slug: blogs.slug,
      publishedAt: blogs.publishedAt,
    })
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  if (existing.length === 0) throw new Error("Blog not found");

  if (existing[0].publishedAt && contentEdited)
    throw new Error("Cannot update published blog");

  if (data.categoryId) {
    const [existingCategory] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, data.categoryId));

    if (!existingCategory) throw new Error("Categories not found");
  }

  let slug = existing[0].slug;

  if (data.title) {
    const newSlug = generateSlug(
      data.title,
      data.title.toLowerCase() === "untitled"
    );
    if (newSlug !== existing[0].slug) slug = newSlug;

    // check if duplicate slug
    const [existingSlug] = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1);
    if (existingSlug && existingSlug.id !== id)
      throw new Error(
        "Blog with same name already exists. Please choose a different name."
      );
  }

  const [updated] = await db
    .update(blogs)
    .set({ ...data, slug })
    .where(eq(blogs.id, id))
    .returning({ slug: blogs.slug });

  revalidatePath(`/cms/blogs`);
  revalidatePath(`/blogs/${updated.slug}`);
}

export async function deleteBlog(id: string) {
  await checkAuth(["admin", "moderator"]);

  await db.delete(blogs).where(eq(blogs.id, id));

  revalidatePath(`/cms/blogs`);
  revalidatePath(`/blogs`);
}

export async function publishBlog({ id }: { id: string }) {
  await checkAuth(["admin", "moderator"]);

  await db
    .update(blogs)
    .set({
      publishedAt: new Date(),
    })
    .where(eq(blogs.id, id));

  revalidatePath(`/cms/blogs/${id}`);
  revalidatePath(`/blogs`);
}

export async function unpublishBlog(id: string) {
  await checkAuth(["admin", "moderator"]);

  await db.update(blogs).set({ publishedAt: null }).where(eq(blogs.id, id));

  revalidatePath(`/cms/blogs/${id}`);
  revalidatePath(`/blogs`);
}
