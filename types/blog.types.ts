import { TBlogTableSelect } from "@/db/schema/blog";

export type TBlogsResponse = Pick<
  TBlogTableSelect,
  "id" | "title" | "slug" | "updatedAt" | "publishedAt" | "isFavourite"
>[];

export type TBlogsResponse_Public = (Pick<
  TBlogTableSelect,
  | "id"
  | "title"
  | "slug"
  | "summary"
  | "publishedAt"
  | "keywords"
  | "coverImage"
  | "stats"
  | "author"
  | "updatedAt"
  | "content"
> & {
  categoryName: string;
})[];
