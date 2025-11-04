import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TBlogsResponse_Public } from "../../../../../types/blog.types";
import Link from "next/link";
import BlogCard from "../../blogs/blog-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gridClassName } from ".";

export default async function BlogsBlock({
  limit,
  order,
  selected,
  cols
}: RefItemBlockDto & { refRelation: ERefRelation.Blogs }) {
  const urlSearchParams = new URLSearchParams({
    limit: limit?.toString(),
    order: order,
  });

  if (selected?.length)
    urlSearchParams.set("slugs", selected.map((s) => s.value)?.join(","));
  const res = await serverFetch("/blogs" + `?${urlSearchParams.toString()}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const blogs: TBlogsResponse_Public = await res.json();

  return (
    <>
      <section className={cn(
        "grid gap-6",
        gridClassName[cols as keyof typeof gridClassName]
      )}>
        {blogs.map((b) => {
          return <BlogCard key={b.slug} blog={b} />;
        })}
      </section>
      <div className="flex justify-center">
        <Button variant={"link"} asChild>
          <Link className="text-primary  w-fit flex justify-center" href={"/blogs"}>
            View All Blogs
          </Link>
        </Button>
      </div>
    </>
  );
}
