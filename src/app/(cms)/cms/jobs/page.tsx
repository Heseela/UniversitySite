import ContainerLayout from "@/components/cms/container-layout";
import JobsList from "@/components/cms/jobs/jobs-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Jobs",
};

export type JobsPageProps = {
  searchParams: {
    q?: string;
    department?: string;
    type?: string;
    status?: string;
    limit?: string;
  };
};

export default async function JobsPage(props: {
  searchParams: Promise<JobsPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;

  return (
    <ContainerLayout
      title="Jobs"
      description="Manage your job postings here."
      actionTrigger={
        <Button asChild>
          <Link href="/cms/jobs/new">
            <Plus /> New Job
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <JobsList searchParams={searchParams} />
      </Suspense>
    </ContainerLayout>
  );
}