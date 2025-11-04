import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as authSchema from "./schema/auth"
import * as blogSchema from "./schema/blog"
import * as pageSchema from "./schema/page"
import * as mediaSchema from "./schema/media"
import * as formSchema from "./schema/form"
import * as globalsSchema from "./schema/globals"
import * as siteSettingSchema from "./schema/site-setting"
import * as credibilityAndSupport from "./schema/credibility-and-support"
import * as teamsSchema from "./schema/team"
import * as categoriesSchema from "./schema/category"
import * as eventsSchema from "./schema/event"


const connectionString = process.env.AUTH_DRIZZLE_URL!;
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool, {
    schema: {
        ...authSchema,
        ...blogSchema,
        ...pageSchema,
        ...mediaSchema,
        ...formSchema,
        ...globalsSchema,
        ...siteSettingSchema,
        ...teamsSchema,
        ...credibilityAndSupport,
        ...categoriesSchema,
        ...eventsSchema
    }
});