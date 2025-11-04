"use client";

import { TEventsResponse_Public } from "../../../../types/event.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import EventCard from "./event-card";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function EventsContainer() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const { data, error } = useSuspenseQuery({
    queryKey: ["events", queryString],
    queryFn: async () => {
      const res = await serverFetch(`/events?${queryString}`, {
        next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
      });
      return await res.json() as TEventsResponse_Public;
    }
  })

  const events = useMemo(() => {
    return data.reduce((groups, event) => {
      const date = new Date(event.eventDate);
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!groups[month]) {
        groups[month] = [];
      }

      groups[month].push(event);
      return groups;
    }, {} as Record<string, typeof data>);
  }, [data])

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Fetch Failed</h3>
        <p className="text-muted-foreground mb-6">Something is wrong.</p>
      </div>
    );
  }

  if ((!!searchParams.get("q") || !!searchParams.get("category")) && Object.keys(events).length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find any event events matching your search
          criteria.
        </p>
      </div>
    )
  }

  return (
    Object.keys(events).length > 0 && (
      <div className="space-y-16">
        {Object.entries(events).map(([month, monthEvents]) => (
          <div key={month}>
            <h2 className="text-2xl font-bold mb-8 border-b pb-4">{month}</h2>

            <div className="space-y-8">
              {monthEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  )
}