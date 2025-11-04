import EventForm from "@/components/cms/events/event-form";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { events } from "@/db/schema/event";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ id: string }>;
};

export default async function UpdateEventPage({ params }: props) {
  const { id } = await params;

  const [event] = await db
    .select()
    .from(events)
    .leftJoin(categories, eq(events.categoryId, categories.id))
    .where(eq(events.id, id));

  if (!event) {
    return notFound();
  }

  return (
    <EventForm
      defaultValues={event.events}
      selectedCategory={{
        label: event.categories?.name || "",
        value: event.categories?.id || null,
      }}
    />
  );
}
