"use server";

import { db } from "@/db";
import { events } from "@/db/schema/event";
import { eq } from "drizzle-orm";
import checkAuth from "../utilities/check-auth";
import { revalidatePath } from "next/cache";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { eventSchema, eventSchemaType } from "@/schemas/event.schema";

export async function createEvent(values: eventSchemaType) {
  await checkAuth(["admin", "moderator"]);

  const { success, data, error } = eventSchema.safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const inserted = await db
    .insert(events)
    .values({
      ...data,
      content: data.content,
      slug: generateSlug(data.title),
    })
    .returning({ id: events.id });

  if (inserted.length === 0) throw new Error("Failed to create event");

  return { id: inserted[0].id };
}

export async function updateEvent(
  id: string,
  values: Partial<eventSchemaType>,
  contentEdited: boolean = true
) {
  await checkAuth(["admin", "moderator"]);

  const { success, data, error } = eventSchema.partial().safeParse(values);

  if (!success) throwZodErrorMsg(error);

  const existing = await db
    .select({ title: events.title, slug: events.slug })
    .from(events)
    .where(eq(events.id, id))
    .limit(1);

  if (existing.length === 0) throw new Error("Event not found");

  let slug = existing[0].slug;

  if (data.title) {
    const newSlug = generateSlug(
      data.title,
      data.title.toLowerCase() === "untitled"
    );
    if (newSlug !== existing[0].slug) slug = newSlug;

    // check if duplicate slug
    const [existingSlug] = await db
      .select({ id: events.id })
      .from(events)
      .where(eq(events.slug, slug))
      .limit(1);
    if (existingSlug && existingSlug.id !== id)
      throw new Error(
        "Event with same name already exists. Please choose a different name."
      );
  }

  const [updated] = await db
    .update(events)
    .set({ ...data, slug })
    .where(eq(events.id, id))
    .returning({ slug: events.slug });

  revalidatePath(`/cms/events`);
  revalidatePath(`/events/${updated.slug}`);
}

export async function deleteEvent(id: string) {
  await checkAuth(["admin", "moderator"]);

  await db.delete(events).where(eq(events.id, id));

  revalidatePath(`/cms/events`);
  revalidatePath(`/events`);
}
