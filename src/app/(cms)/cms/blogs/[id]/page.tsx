import BlogForm from "@/components/cms/blogs/blog-form";
import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { categories, CategoryType } from "@/db/schema/category";
import { and, eq } from "drizzle-orm";
import { Info } from "lucide-react";
import { SelectOption } from "../../../../../../types/global.types";

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogEditPage(props: {
  params: Promise<Props["params"]>;
}) {
  const { id } = await props.params;

  const [blog] = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      slug: blogs.slug,
      summary: blogs.summary,
      content: blogs.content,
      publishedAt: blogs.publishedAt,
      keywords: blogs.keywords,
      coverImage: blogs.coverImage,
      length: blogs.length,
      categoryId: blogs.categoryId,
      categoryName: categories.name,
      author: blogs.author,
      isFavourite: blogs.isFavourite,
      updatedAt: blogs.updatedAt
    })
    .from(blogs)
    .where(eq(blogs.id, id))
    .leftJoin(categories, eq(categories.id, blogs.categoryId))
    .limit(1);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const categoriesOption: SelectOption[] = await db
    .select({ value: categories.id, label: categories.name })
    .from(categories)
    .where(eq(categories.type, CategoryType.BLOG));

  return (
    <>
      {blog.publishedAt && (
        <div className="lg:mx-auto flex items-center gap-2 text-sm font-medium text-cyan-600 bg-cyan-50 border-cyan-300 border rounded-md p-2 w-fit">
          <Info size={16} />
          <p>
            You can&apos;t edit a published blog. If you wish to edit it,
            unpublish the blog first.
          </p>
        </div>
      )}

      <BlogForm categoriesOptions={categoriesOption} defaultValues={blog} />
    </>
  );
}
