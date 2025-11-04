import { FormsPageProps } from "@/app/(cms)/cms/forms/page";
import { db } from "@/db";
import { forms, formSubmissions } from "@/db/schema/form";
import { and, desc, eq, ilike, SQL } from "drizzle-orm";
import checkAuth from "../utilities/check-auth";
import { getPaginationQueryParams, paginatedResponse } from "../db-utils";
import { cache } from "react";
import { TDataSearchParams } from "../../../types/global.types";

export const getForms = cache(async (searchParamsProps: FormsPageProps["searchParams"]) => {
    try {
        await checkAuth('admin');

        const searchParams = await searchParamsProps;
        const { page, pageSize } = getPaginationQueryParams(new URLSearchParams(searchParams));

        const filters: SQL[] = [];
        const { q } = searchParams;
        if (q) filters.push(ilike(forms.title, `%${q}%`));

        const query = db
            .select({
                id: forms.id,
                title: forms.title,
                slug: forms.slug,
                createdAt: forms.createdAt,
                updatedAt: forms.updatedAt
            })
            .from(forms)
            .where(and(...filters))
            .orderBy(desc(forms.updatedAt));

        return paginatedResponse({
            orderByColumn: desc(forms.updatedAt),
            qb: query.$dynamic(),
            page,
            pageSize
        });
    } catch (e) {
        console.error(e);
        return null;
    }
});

export const getFormById = cache(async (id: string) => {
    try {
        await checkAuth('admin');

        const [form] = await db.select({
            id: forms.id,
            title: forms.title,
            fields: forms.fields,
            slug: forms.slug,
            submitBtnLabel: forms.submitBtnLabel,
            createdAt: forms.createdAt,
            updatedAt: forms.updatedAt
        }).from(forms).where(eq(forms.id, id)).limit(1);

        return form;
    } catch (e) {
        console.error(e);
        return null;
    }
});


export const getFormSubmissions = cache(async (formId: string, searchParamsProps: TDataSearchParams) => {
    try {
        await checkAuth('admin');

        const searchParams = await searchParamsProps;
        const { page, pageSize } = getPaginationQueryParams(new URLSearchParams(searchParams));

        const filters: SQL[] = [];
        const { q } = searchParams;
        if (q) filters.push(ilike(forms.title, `%${q}%`));

        const query = db.select().from(formSubmissions)
            .where(and(
                eq(formSubmissions.formId, formId),
                ...filters
            ))

        const submissions = await paginatedResponse({
            orderByColumn: desc(formSubmissions.createdAt),
            qb: query.$dynamic(),
            page,
            pageSize
        });

        return submissions;
    } catch (e) {
        console.error(e);
        return null;
    }
});