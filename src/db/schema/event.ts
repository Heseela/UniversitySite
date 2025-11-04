import { relations } from "drizzle-orm";
import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { categories } from "./category";
import { TMediaSchema } from "@/schemas/media.schema";
import { IRichTextSchema } from "@/schemas/rich-text.schema";

export const events = pgTable(
  "events",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").default("Untitled").notNull(),
    content: jsonb("content").$type<IRichTextSchema>().notNull(),
    summary: text("summary").default("").notNull(),
    slug: text("slug").unique().notNull(),
    coverImage: jsonb("coverImage").$type<TMediaSchema>(),
    eventDate: timestamp("eventDate").notNull(),
    venue: text("venue").$type<"virtual" | string>().default("").notNull(),
    updatedAt: timestamp({ mode: "date", precision: 3 })
      .$onUpdate(() => new Date())
      .notNull()
      .default(new Date()),
    capacity: integer("capacity").default(0),
    categoryId: text("categoryId")
      .references(() => categories.id)
      .notNull(),
  },
  (table) => [
    uniqueIndex("event_slug_idx").on(table.slug),
    index("event_title_idx").on(table.title),
  ]
);

export type TEvent = typeof events.$inferSelect;

export const eventsRelations = relations(events, ({ one }) => ({
  category: one(categories, {
    fields: [events.categoryId],
    references: [categories.id],
  }),
}));
