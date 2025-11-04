import { DataTable } from '@/components/data-table/data-table';
import { blogsColumns } from './blogs-column';
import BlogsSearchFilters from './blogs-search-filters';
import { BlogsPageProps } from '@/app/(cms)/cms/blogs/page';
import { db } from '@/db'
import { blogs } from '@/db/schema/blog'
import { and, desc, eq, ilike, isNull, not, SQL } from 'drizzle-orm'

export default async function BlogsList({ searchParams }: { searchParams: BlogsPageProps["searchParams"] }) {
    const { published, q, favourite } = searchParams;

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));
    if (published === "true") filters.push(not(isNull(blogs.publishedAt)));
    if (published === "false") filters.push(isNull(blogs.publishedAt));
    if (favourite === "true") filters.push(eq(blogs.isFavourite, true));

    const foundBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            publishedAt: blogs.publishedAt,
            updatedAt: blogs.updatedAt,
            isFavourite: blogs.isFavourite,
        })
        .from(blogs)
        .where(and(...filters))
        .orderBy(desc(blogs.updatedAt));

    return (
        <>
            <BlogsSearchFilters />

            <DataTable columns={blogsColumns} data={foundBlogs} />

            <section>
                <span className='text-sm text-muted-foreground'>{foundBlogs.length} Blog(s)</span>
            </section>
        </>
    )
}