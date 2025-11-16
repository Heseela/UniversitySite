"use server";

import { db } from "./index";
import { credibilityAndSupportTable } from "./schema/credibility-and-support";
import { footer, header } from "./schema/globals";
import { siteSetting } from "./schema/site-setting";

export async function seed() {
    await db.insert(header).values({
        navLinks: []
    });

    await db.insert(footer).values({
        navLinks: [],
        footerText: ""
    });

    await db.insert(siteSetting).values({
        logoLight_primary: null,
        logoDark_primary: null,
        logoLight_secondary: null,
        logoDark_secondary: null,
        address: "",
        mapLink: "",
        emails: [],
        phones: [],
        socialLinks: [],
    });

    await db.insert(credibilityAndSupportTable).values({
        faqCategories: [],
        faqs: [],
        partners: [],
        testimonials: [],
        certifications: [],
        alumni: [],
    })

    console.log("✅ Database seeded")
}

export async function seedCompleteSite() {
    await db.transaction(async (tx) => { })

    console.log("✅ Database seeded")
}