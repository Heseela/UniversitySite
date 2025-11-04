import { TFormFieldDef } from "@/schemas/forms.schema";
import { PaginatedResponse } from "./global.types";

export type TFormsResponse = PaginatedResponse<{
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}>

export type TForm = {
    id: string;
    title: string;
    fields: TFormFieldDef[];
    slug: string;
    submitBtnLabel: string;
}

export type TFormSubmissionsResponse = PaginatedResponse<{
    id: string;
    formId: string;
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}>