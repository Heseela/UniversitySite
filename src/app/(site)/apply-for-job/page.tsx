import RenderHero from "@/components/site/heros/render-hero";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import RenderSections from "@/components/site/blocks/render-sections";

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(APPLY_FOR_JOB_SLUG);

  return {
    title: page.metadata?.title || "Apply for Job",
    description: page.metadata?.description || "Apply for a position at our organization",
    keywords: page.metadata?.keywords,
  };
};

export default async function ApplyForJobPage() {
  const page = await fetchPage(APPLY_FOR_JOB_SLUG);

  return (
    <>
      <RenderHero heroSections={page.heroSections} />
      <RenderSections sections={page.sections} />
    </>
  );
}