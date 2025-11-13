import EventFilters from "@/components/site/events/event-filters";
import EventsContainer from "@/components/site/events/events-container";
import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryType } from "@/db/schema/category";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { TPaginatedOptions } from "../../../../types/global.types";
import { EventCardSkeleton } from "@/components/site/events/event-card";
import { EVENTS_SLUG } from "@/app/slugs";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(EVENTS_SLUG);

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    keywords: page.metadata?.keywords,
  };
};

export default async function EventsPage() {
  const page = await fetchPage(EVENTS_SLUG);
  const categories = await fetchCategories(CategoryType.EVENT);

  return (
    <>
      <RenderHero heroSections={page.heroSections} />

      <section className="container py-12">
        <Suspense fallback={<Skeleton className="h-12" />}>
          <EventFilters categories={categories} />
        </Suspense>

        <div className="space-y-8">
          <Suspense
            fallback={Array.from({ length: 3 }, (_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          >
            <EventsContainer />
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
