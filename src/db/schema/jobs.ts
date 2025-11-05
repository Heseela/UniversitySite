import { EJobStatus, EJobType } from '@/schemas/job.schema';
import { IRichTextSchema } from '@/schemas/rich-text.schema';
import { pgTable, text, pgEnum, index, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const jobTypeEnum = pgEnum('job_type', EJobType);
export const jobStatusEnum = pgEnum('job_status', EJobStatus);

export const jobsTable = pgTable('jobs', {
    id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()), // Add .notNull()
    slug: text("slug").notNull(),

    title: text('title').notNull(),
    department: text('department').notNull(),
    type: jobTypeEnum('type').notNull(),
    description: jsonb("description").$type<IRichTextSchema>().notNull(),
    status: jobStatusEnum('status').default(EJobStatus.Open).notNull(), // Already has default

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => ({
    slugIdx: index('jobs_slug_idx').on(table.slug),
    titleIdx: index('jobs_title_idx').on(table.title),
}));

export type TJobsTabelSelect = typeof jobsTable.$inferSelect;
export type TJobsTabelInsert = typeof jobsTable.$inferInsert;