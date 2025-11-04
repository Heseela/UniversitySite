import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import Link from "next/link";
import EventCard from "../../events/event-card";
import { TEventsResponse_Public } from "../../../../../types/event.types";
import { Button } from "@/components/ui/button";
import { gridClassName } from ".";
import { cn } from "@/lib/utils";

export default async function EventsBlock({
  limit,
  order,
  selected,
  cols
}: RefItemBlockDto & { refRelation: ERefRelation.Events }) {
  const urlSearchParams = new URLSearchParams({
    limit: limit?.toString(),
    order: order,
  });

  if (selected?.length)
    urlSearchParams.set("slugs", selected.map((s) => s.value)?.join(","));

  const res = await serverFetch("/events" + `?${urlSearchParams.toString()}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const events: TEventsResponse_Public = await res.json();

  return (
    <>
      <section className={cn(
        "grid gap-6",
        gridClassName[cols as keyof typeof gridClassName]
      )}>
        {events.map((b) => {
          return <EventCard key={b.slug} event={b} />;
        })}
      </section>
      <div className="flex justify-center">
        <Button variant={"link"} asChild>
          <Link className="text-primary  w-fit flex justify-center" href={"/blogs"}>
            View All Events
          </Link>
        </Button>
      </div>
    </>
  );
}
