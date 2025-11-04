import { DataTable } from "@/components/data-table/data-table";

import { BlogsPageProps } from "@/app/(cms)/cms/blogs/page";
import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, desc, eq, ilike, isNull, not, SQL } from "drizzle-orm";
import { EventsPageProps } from "@/app/(cms)/cms/events/page";
import { events } from "@/db/schema/event";
import { eventsColumns } from "./event-column";

export default async function EventsList({
  searchParams,
}: {
  searchParams: EventsPageProps["searchParams"];
}) {
  const { q } = searchParams;

  const filters: SQL[] = [];

  if (q) filters.push(ilike(blogs.title, `%${q}%`));

  const foundEvents = await db
    .select({
      id: events.id,
      title: events.title,
      slug: events.slug,
      eventDate: events.eventDate,
    })
    .from(events)
    .where(and(...filters))
    .orderBy(desc(events.updatedAt));

  return (
    <>
      {/* <EventsSearchFilters /> */}

      <DataTable columns={eventsColumns} data={foundEvents} />

      <section>
        <span className="text-sm text-muted-foreground">
          {foundEvents.length} Event(s)
        </span>
      </section>
    </>
  );
}
