import RenderHero from "@/components/site/heros/render-hero";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { fetchPage } from "@/lib/utilities/fetchPage";
import { Metadata } from "next";
import { JOBS_SLUG, APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import JobCard from "@/components/site/jobs/job-card";
import { TJobResponse_Public } from "../../../../types/job.types";

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
  const res = await serverFetch("/jobs", {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) }
  });

  if (!res.ok) return <NoJobs />;

  const jobs = await res.json() as TJobResponse_Public;

  if (jobs.length === 0) return <NoJobs />;

  return (
    <>
      <RenderHero heroSections={page.heroSections} />

      <section className="container py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Career Opportunities</h1>
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

        <div className="space-y-8 mt-8">
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function NoJobs() {
  return (
    <div className="text-center py-12">
      <div className="text-slate-400 text-lg mb-2">No job openings found</div>
      <p className="text-slate-500">
        We don't have any open positions matching your criteria at the moment.
        Please check back later or try different filters.
      </p>
    </div>
  )
}