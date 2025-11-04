import { z } from 'zod';
import { richTextDefaultValues, richTextSchema } from './rich-text.schema';

export enum EJobType {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship',
    Contract = 'contract'
}

export enum EJobStatus {
    Open = 'open',
    Closed = 'closed'
}

export const jobSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    department: z.string().min(1, { message: 'Department is required' }),

    type: z.nativeEnum(EJobType, { message: 'Type must be one of the allowed job types' }),

    description: richTextSchema,

    status: z.nativeEnum(EJobStatus, { message: 'Status must be one of the allowed values' }),
});

export type TJobSchemaType = z.infer<typeof jobSchema>;

export const jobFormDefaultValues: TJobSchemaType = {
    title: '',
    department: '',
    type: EJobType.FullTime,
    description: richTextDefaultValues,
    status: EJobStatus.Open,
};