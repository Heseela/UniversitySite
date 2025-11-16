import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { categories } from "./category";
import { TBlogSchema } from "@/schemas/blog.schema";
import { IRichTextSchema } from "@/schemas/rich-text.schema";

export const blogs = pgTable(
  "blogs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").default("Untitled").notNull(),
    content: jsonb("content").$type<IRichTextSchema>().notNull(),
    summary: text("summary").default("").notNull(),
    slug: text("slug").unique().notNull(),
    coverImage: text("coverImage"),
    updatedAt: timestamp({ mode: "date", precision: 3 })
      .$onUpdate(() => new Date())
      .notNull()
      .default(new Date()),
    publishedAt: timestamp("publishedAt", { mode: "date" }),
    isFavourite: boolean("isFavourite").default(false).notNull(),
    stats: jsonb("stats").$type<TBlogSchema["stats"]>().default({
      characters: 0,
      words: 0,
    }).notNull(),
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
