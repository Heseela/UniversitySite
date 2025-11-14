import { TJobsTabelSelect } from "@/db/schema/jobs";
import { EJobStatus, EJobType } from "@/schemas/job.schema";

export type TJobResponse = Pick<
  TJobsTabelSelect,
  "id" | "title" | "slug" | "department" | "type" | "status" | "createdAt" | "updatedAt"
>[];

export type TJobResponse_Public = (Pick<
  TJobsTabelSelect,
  | "id"
  | "title"
  | "slug"
  | "department"
  | "type"
  | "status"
  | "description"
  | "createdAt"
  | "updatedAt"
> & { 
  excerpt?: string;
})[];

export type TJobTableData = {
  id: string;
  title: string;
  slug: string;
  department: string;
  type: EJobType;
  status: EJobStatus;
  createdAt: Date;
  updatedAt: Date;
};