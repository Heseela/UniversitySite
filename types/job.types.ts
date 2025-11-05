import { TJobsTabelSelect } from "@/db/schema/jobs";
import { EJobStatus } from "@/schemas/job.schema";

// export type TJobResponse = Pick<
//   TJobsTabelSelect,
//   "id" | "title" | "department" | "type" | "status"
// >[];



export type TJobResponse = (Pick<
  TJobsTabelSelect,
  "id" | "title" | "department" | "type" | "status"
> & {
  id: string;
  status: EJobStatus;
})[];