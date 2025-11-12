// app/apply-for-job/page.tsx
import RenderHero from "@/components/site/heros/render-hero";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import JobApplicationForm from "@/components/site/jobs/job-application-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 60;

export const generateMetadata = async (): Promise<Metadata> => {
  const page = await fetchPage(APPLY_FOR_JOB_SLUG);

  return {
    title: page.metadata?.title || "Apply for Job",
    description: page.metadata?.description || "Apply for exciting career opportunities",
    keywords: page.metadata?.keywords,
  };
};

export default async function ApplyForJobPage() {
  const page = await fetchPage(APPLY_FOR_JOB_SLUG);

  return (
    <>
      <RenderHero hero={page.heroSections[0]} />
      
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to take the next step in your career? Fill out the application form below 
              and we'll get back to you soon.
            </p>
          </div>

          <Suspense fallback={<JobApplicationFormSkeleton />}>
            <JobApplicationForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function JobApplicationFormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}