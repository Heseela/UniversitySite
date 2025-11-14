import RenderHero from "@/components/site/heros/render-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { GALLERY_SLUG } from "@/app/slugs";
import GalleryContainer from "@/components/site/gallery/gallery-container";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(GALLERY_SLUG);

  return {
    title: page.metadata?.title || "Our Gallery",
    description: page.metadata?.description || "Explore our gallery of images and moments",
    keywords: page.metadata?.keywords,
  };
};

export default async function GalleryPage() {
  const page = await fetchPage(GALLERY_SLUG);

  return (
    <>
      <RenderHero heroSections={page.heroSections} />
      
      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {page.metadata?.title || "Our Gallery"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {page.metadata?.description || "Explore moments from campus life, events, and achievements."}
          </p>
        </div>

        <Suspense fallback={<GallerySkeleton />}>
          <GalleryContainer />
        </Suspense>
      </section>
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter skeleton */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-10 w-20 rounded-full" />
        ))}
      </div>
      
      {/* Images skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="aspect-[4/3] rounded-xl" />
        ))}
      </div>
    </div>
  );
}