import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const media = pgTable(
    "media",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: text("name").notNull(),
        originalName: text("originalName").notNull(),
        alt: text("alt").default("").notNull(),
        caption: text("caption").default("").notNull(),

        public_id: text("public_id").notNull(),
        secure_url: text("secure_url").notNull(),
        width: integer("width").notNull(),
        height: integer("height").notNull(),
        format: text("format").notNull(),
        resource_type: text("resource_type").notNull(),
        bytes: integer("bytes").notNull(),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => [
        index("name_idx").on(table.name),
    ]
);

