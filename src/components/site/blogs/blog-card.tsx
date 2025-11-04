import { Calendar, User } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { getReadingTimeInMinutes } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TBlogsResponse_Public } from "../../../../types/blog.types";

type Props = {
  blog: TBlogsResponse_Public[0];
  imgHeight?: number; // this is used to control the height of the image based on the blog card layout
};

export default function BlogCard({ blog, imgHeight = 300 }: Props) {
  return (
    <article className="@container">
      <div className="card h-full bg-white shadow-sm rounded-b-xl">
        <div className="flex flex-col h-full @2xl:flex-row">
          <div className="@2xl:rounded-l-xl @2xl:rounded-tr-none rounded-t-xl overflow-hidden">
            {blog.coverImage && (
              <CloudinaryImage
                width={400}
                height={imgHeight}
                src={blog.coverImage}
                sizes="500px"
                alt="Blog Cover Image"
                crop="auto"
                className="w-full h-[300px] @2xl:h-full @2xl:max-w-[400px] object-cover"
              />
            )}
          </div>

          <div className="grow p-6 flex flex-col">
            <Badge variant={"secondary"} className="text-primary mb-1">
              {blog.categoryName}
            </Badge>

            <Link
              href={`/blogs/${blog.slug}`}
              className="hover:underline w-fit decoration-primary decoration-2"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {blog.title}
              </h3>
            </Link>

            <section className="text-sm text-slate-500 mb-3 space-y-2">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Calendar size={14} className="mr-1" />
                  {blog.publishedAt && (
                    <span>{format(blog.publishedAt, "EEE MMM dd, yyy")}</span>
                  )}
                </div>
                <div>
                  <span className="mr-4">|</span>
                  <span>
                    {getReadingTimeInMinutes(blog.length)} minutes read
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>{blog.author}</span>
              </div>
            </section>

            <p className="text-slate-600 mb-4 line-clamp-3 max-w-5xl">
              {blog.summary}
            </p>

            <LinkButton href={`/blogs/${blog.slug}`} className="w-fit text-base">
              Read More
            </LinkButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogCardSkeleton() {
  return (
    <article className="@container">
      <div className="card">
        <div className="flex flex-col @2xl:flex-row">
          {/* Image skeleton */}
          <Skeleton className="@2xl:rounded-l-xl @2xl:rounded-tr-none rounded-t-xl overflow-hidden w-full @4xl:max-w-[400px] @2xl:max-w-[250px] min-h-[300px]" />

          <div className="p-6 grow">
            {/* Badge skeleton */}
            <Skeleton className="w-16 h-5 rounded-full mb-1" />

            {/* Title skeleton */}
            <div className="mb-3">
              <Skeleton className="w-2/4 h-6 rounded mb-2" />
            </div>

            {/* Metadata section skeleton */}
            <section className="text-sm mb-3 space-y-2">
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Calendar size={14} className="mr-1 text-gray-300" />
                  <Skeleton className="w-24 h-4 rounded" />
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-gray-300">|</span>
                  <Skeleton className="w-20 h-4 rounded" />
                </div>
              </div>

              <div className="flex items-center">
                <User size={14} className="mr-1 text-gray-300" />
                <Skeleton className="w-24 h-4 rounded" />
              </div>
            </section>

            {/* Summary skeleton */}
            <div className="mb-4 space-y-2">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-3/4 h-4 rounded" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="w-24 h-9 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
}
