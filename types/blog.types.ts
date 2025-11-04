import { YooptaContentValue } from "@yoopta/editor";

export type TBlog = {
  id: string;
  title: string;
  content: YooptaContentValue;
  summary: string;
  slug: string;
  coverImage: string | null;
  publishedAt: Date | null;
  keywords: string[];
  updatedAt: Date;
  isFavourite: boolean;
  length: number;
  categoryName?: string | null;
  categoryId?: string | null;
  author: string;
};

export type TBlogsResponse = Pick<
  TBlog,
  "id" | "title" | "slug" | "updatedAt" | "publishedAt" | "isFavourite"
>[];

export type TBlogsResponse_Public = (Pick<
  TBlog,
  | "id"
  | "title"
  | "slug"
  | "summary"
  | "publishedAt"
  | "keywords"
  | "coverImage"
  | "length"
  | "author"
  | "updatedAt"
> & {
  categoryName: string;
})[];
