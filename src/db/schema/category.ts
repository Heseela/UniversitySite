import { relations } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { events } from "./event";

export enum CategoryType {
  EVENT = "event",
  BLOG = "blog",
}

export const categories = pgTable(
  "categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").unique().notNull(),
    type: text("type")
      .$type<CategoryType>()
      .default(CategoryType.BLOG)
      .notNull(),
  },
  (table) => [
    index("category_name_idx").on(table.name),
    index("category_type_idx").on(table.name),
  ]
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  blogs: many(blogs),
  events: many(events),
}));

export type CategoriesSelect = typeof categories.$inferSelect;
