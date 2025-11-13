import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryType } from "@/db/schema/category";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { TPaginatedOptions } from "../../../../types/global.types";
import { JOBS_SLUG, APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { JobCardSkeleton } from "@/components/site/jobs/job-card";
import JobsContainer from "@/components/site/jobs/jobs-container";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(JOBS_SLUG);

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
};

export default async function JobsPage() {
  const page = await fetchPage(JOBS_SLUG);

  return (
    <>
      <RenderHero heroSections={page.heroSections} />

      <section className="container py-12">
        {/* Header with Apply Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Opportunities</h1>
            <p className="text-gray-600 mt-2">
              Join our team and make a difference in education
            </p>
          </div>
          
          <Button
            asChild
            className="bg-[var(--pinkish)] hover:bg-pink-500 text-white px-6 py-2 transition-colors shadow-sm"
          >
            <Link href={`/${APPLY_FOR_JOB_SLUG}`} className="flex items-center gap-2">
              <Plus size={16} />
              Apply for Job
            </Link>
          </Button>
        </div>

        {/* Jobs Container */}
        <div className="space-y-8 mt-8">
          <Suspense
            fallback={Array.from({ length: 3 }, (_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          >
            <JobsContainer />
          </Suspense>
        </div>
      </section>
    </>
  );
}

export async function fetchCategories(type: CategoryType) {
  const res = await serverFetch(`/categories/options?type=${type}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
    cache: "force-cache",
  });

  if (!res.ok) {
    return null;
  }

  const categories: TPaginatedOptions = await res.json();

  return categories;
}