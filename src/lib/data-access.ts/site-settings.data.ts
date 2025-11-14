import { db } from "@/db";
import { footer, header, TFooterSelect, THeaderSelect } from "@/db/schema/globals";
import { siteSetting, TSiteSettingSelect } from "@/db/schema/site-setting";
import { cache } from "react";

export const getSiteSettings = cache(async (): Promise<TSiteSettingSelect> => {
    const [setting] = await db.select().from(siteSetting).limit(1);

    if (!setting) {
        throw new Error("Site settings not found. Please seed the database first.");
    }

    return setting;
});

export const getHeader = cache(async (): Promise<THeaderSelect> => {
    const [h] = await db.select().from(header).limit(1);

    if (!h) {
        throw new Error("Header not found. Please seed the database first.");
    }

    return h;
})

export const getFooter = cache(async (): Promise<TFooterSelect> => {
    const [f] = await db.select().from(footer).limit(1);

    if (!f) {
        throw new Error("Footer not found. Please seed the database first.");
    }

    return f;
});