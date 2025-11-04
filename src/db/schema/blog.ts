import { YooptaContentValue } from "@yoopta/editor";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { categories } from "./category";

export const blogs = pgTable(
  "blogs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").default("Untitled").notNull(),
    content: jsonb("content").$type<YooptaContentValue>().notNull(),
    summary: text("summary").default("").notNull(),
    slug: text("slug").unique().notNull(),
    coverImage: text("coverImage"),
    updatedAt: timestamp({ mode: "date", precision: 3 })
      .$onUpdate(() => new Date())
      .notNull()
      .default(new Date()),
    publishedAt: timestamp("publishedAt", { mode: "date" }),
    isFavourite: boolean("isFavourite").default(false).notNull(),
    length: integer("length").default(0).notNull(),
    keywords: text("keywords")
      .array()
      .default(sql`ARRAY[]::text[]`)
      .notNull(),
    categoryId: text("categoryId").references(() => categories.id),
    author: text("author").notNull().default("Unknown"),
  },
  (table) => [
    uniqueIndex("slug_idx").on(table.slug),
    index("title_idx").on(table.title),
  ]
);

export type TBlogTableSelect = typeof blogs.$inferSelect;

export const blogsRelations = relations(blogs, ({ one }) => ({
  category: one(categories, {
    fields: [blogs.categoryId],
    references: [categories.id],
  }),
}));
