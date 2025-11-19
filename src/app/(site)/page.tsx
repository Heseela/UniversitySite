import { Metadata } from "next";
import RenderHero from "@/components/site/heros/render-hero";
import RenderSections from "@/components/site/blocks/render-sections";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { SITE_TITLE } from "@/CONSTANTS";
import { HOME_SLUG } from "../slugs";

export const generateMetadata = async (): Promise<Metadata> => {
  const { metadata: { title, description, keywords, ogImage } } = await fetchPage(HOME_SLUG);

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
      url: "/",
    },
  }
}

export default async function Page() {
  const page = await fetchPage(HOME_SLUG);

  return (
    <main>
      <RenderHero heroSections={page.heroSections} />
      <RenderSections sections={page.sections} />
    </main>
  );
}

