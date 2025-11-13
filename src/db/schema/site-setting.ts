import { TMediaSchema } from "@/schemas/media.schema";
import { TSiteSettingSchema } from "@/schemas/site-setting.schema";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const siteSetting = pgTable(
    "siteSetting",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),

       // Primary logos
       logoLight_primary: jsonb("logoLight_primary").$type<TMediaSchema>(),
       logoDark_primary: jsonb("logoDark_primary").$type<TMediaSchema>(),
       
       // Secondary logos
       logoLight_secondary: jsonb("logoLight_secondary").$type<TMediaSchema>(),
       logoDark_secondary: jsonb("logoDark_secondary").$type<TMediaSchema>(),

        emails: text("emails").array().$type<string[]>().notNull().default([]),
        phones: text("phones").array().$type<string[]>().notNull().default([]),
        address: text("address").notNull().default(""),
        mapLink: text("mapLink").notNull().default(""),
        socialLinks: jsonb("socialLinks").array().$type<TSiteSettingSchema["socialLinks"]>().notNull(),
        highlightAnnouncement: text("highlightAnnouncement").notNull().default(""),
        
        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    },
);

export type TSiteSettingSelect = typeof siteSetting.$inferSelect;