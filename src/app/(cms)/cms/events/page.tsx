import NewBlogButton from "@/components/cms/blogs/new-blog-btn";
import ContainerLayout from "@/components/cms/container-layout";
import EventsList from "@/components/cms/events/events-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Events",
};

export type EventsPageProps = {
  searchParams: {
    q?: string;
    category?: string;
    limit?: string;
  };
};

export default async function EventsPage(props: {
  searchParams: Promise<EventsPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;

  return (
    <ContainerLayout
      title="Events"
      description="Manage your events here."
      actionTrigger={
        <Button asChild>
          <Link href="/cms/events/new">
            <Plus /> New Event
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList searchParams={searchParams} />
      </Suspense>
    </ContainerLayout>
  );
}
