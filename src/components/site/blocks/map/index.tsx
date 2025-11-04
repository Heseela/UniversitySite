import { serverFetch } from '@/lib/data-access.ts/server-fetch';
import { TSiteSettingSchema } from '@/schemas/site-setting.schema';

export const RenderMapBlock = async () => {
    const siteResponse = await serverFetch(`/site-settings`);
    const siteData = siteResponse.ok
        ? ((await siteResponse.json()) as TSiteSettingSchema)
        : null;

    if (!siteData?.mapLink) return null;

    return (
        <iframe
            src={siteData.mapLink}
            height="100%"
            width="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    )
}