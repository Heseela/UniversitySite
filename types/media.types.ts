import { TMediaSchema } from "@/schemas/media.schema";
import { PaginatedResponse } from "./global.types";

export type TMedia = TMediaSchema & {
    id: string;
    updatedAt: Date;
}

export type TMediaResponse = PaginatedResponse<TMedia>;