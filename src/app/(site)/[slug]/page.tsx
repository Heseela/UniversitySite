import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import RenderSections from "@/components/site/blocks/render-sections";
import { SITE_TITLE } from "@/CONSTANTS";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { HOME_SLUG } from "@/app/slugs";

export async function generateStaticParams() {
    const allPages = await db.select({ slug: pages.slug }).from(pages);
    return allPages
        .filter(p => p.slug !== HOME_SLUG)
        .map((p) => ({ slug: p.slug }));
}

export const generateMetadata = async ({ params: paramsPromise }: Props): Promise<Metadata> => {
    const { slug = HOME_SLUG } = await paramsPromise;
    const { metadata: { title, description, keywords, ogImage } } = await fetchPage(slug);

    return {
        title,
        description,
        keywords: Array.isArray(keywords) ? keywords : [],
        openGraph: {
            type: "website",
            title: title
                ? title + ` | ${SITE_TITLE}`
                : SITE_TITLE,
            description,
            images: ogImage?.secure_url
                ? [
                    {
                        url: ogImage.secure_url,
                    },
                ] : undefined,
            url: slug === HOME_SLUG ? "/" : `/${slug}`,
        },
    }
}

type Props = {
    params: Promise<{
        slug?: string;
    }>
}

export default async function Page({ params: paramsPromise }: Props) {
    const { slug = HOME_SLUG } = await paramsPromise;
    const page = await fetchPage(slug);

    return (
        <div>
            <RenderHero heroSections={page.heroSections} />
            <RenderSections sections={page.sections} />
        </div>
    );
}