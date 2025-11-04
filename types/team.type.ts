import { TTeamTableSelect } from "@/db/schema/team"

export type TeamResponse = Omit<TTeamTableSelect, "description" | "socialLinks" | "createdAt">[];