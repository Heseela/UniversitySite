"use client";

import BlogCard from "./blog-card";
import { TBlogsResponse_Public } from "../../../../types/blog.types";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";

export default function BlogsContainer() {
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const { data: blogs, error } = useSuspenseQuery({
    queryKey: ["blogs", queryString],
    queryFn: async () => {
      const res = await serverFetch(`/blogs?${queryString}`, {
        next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
      });
      return await res.json() as TBlogsResponse_Public;
    }
  })

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Fetch Failed</h3>
        <p className="text-muted-foreground mb-6">Something is wrong.</p>
      </div>
    );
  }

  if ((!!searchParams.get("q") || !!searchParams.get("category")) && blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find any blog posts matching your search criteria.
        </p>
      </div>
    )
  }

  return (
    blogs.map((blog) => (
      <BlogCard key={blog.slug} blog={blog} />
    ))
  );
}
