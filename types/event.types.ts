import { TEvent } from "@/db/schema/event";

export type TEventsResponse = Pick<
  TEvent,
  "id" | "title" | "slug" | "eventDate"
>[];

export type TEventsResponse_Public = (Pick<
  TEvent,
  | "id"
  | "title"
  | "slug"
  | "summary"
  | "coverImage"
  | "eventDate"
  | "venue"
  | "capacity"
  | "updatedAt"
> & { categoryName?: string })[];
