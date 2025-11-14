import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import RenderSections from "@/components/site/blocks/render-sections";

export const revalidate = 60;

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

      <section className="container">
        <Suspense fallback={<PageSkeleton />}>
          <RenderSections sections={page.sections} />
        </Suspense>
      </section>
    </>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}