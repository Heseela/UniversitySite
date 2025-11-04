import { index, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { TFormFieldDef } from "@/schemas/forms.schema";

export const forms = pgTable(
    "forms",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        title: text("title").notNull(),
        slug: text("slug").notNull(),
        fields: jsonb("fields").$type<TFormFieldDef[]>().notNull(),
        submitBtnLabel: text("submitBtnLabel").notNull().default("Submit"),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => ({
        titleUnique: uniqueIndex("forms_title_unique").on(table.title),
        slugUnique: uniqueIndex("forms_slug_unique").on(table.slug),
    })
);

export const formSubmissions = pgTable(
    "form_submissions",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        formId: text("formId")
            .references(() => forms.id, { onDelete: "cascade" }).notNull(),
        data: jsonb("data").$type<Record<string, unknown>>().notNull(),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => ({
        formIdUnique: index("form_submissions_form_id_unique").on(table.formId),
    })
);

// ---- relations ----
export const formsRelations = relations(forms, ({ many }) => ({
    submissions: many(formSubmissions),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
    form: one(forms, { fields: [formSubmissions.formId], references: [forms.id] }),
}));

export type TFormTableSelect = typeof forms.$inferInsert;
export type TFormSubmissionTableSelect = typeof formSubmissions.$inferInsert;