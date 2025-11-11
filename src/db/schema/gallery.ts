import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { categories } from "./category";
import { relations } from "drizzle-orm";
import { media } from "./media";

export const galleriesTable = pgTable("galleries", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    categoryId: text("categoryId").references(() => categories.id).notNull(),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    uniqueIndex("galleries_category_unique").on(table.categoryId),
]);

export const galleriesRelations = relations(galleriesTable, ({ many, one }) => ({
    media: many(media),
    category: one(categories, {
        fields: [galleriesTable.categoryId],
        references: [categories.id],
    }),
}));