import CloudinaryImage from "@/components/ui/cloudinary-image";
import { ArrowLeft, Calendar, Globe, MapPin, Tag, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db";
import { events, TEvent } from "@/db/schema/event";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await serverFetch(`/events/${slug}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return {
      title: "Event Not Found",
    };
  }

  const event: TEvent = await res.json();

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event?.title,
    description:
      event?.summary ||
      "Read our latest event post on educational insights and resources.",
  };
}

export default async function SingleeventPage({ params }: Props) {
  const { slug } = await params;

  const res = await serverFetch(`/events/${slug}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <Link href="/events" className="btn btn-primary">
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  const event: TEvent & { categoryName: string } = await res.json();

  const eventDate = new Date(event.eventDate);

  const hour = eventDate.getHours().toString().padStart(2, "0");
  const minute = eventDate.getMinutes().toString().padStart(2, "0");

  return (
    <>
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-cream">
        <div className="container mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center text-primary font-medium mb-6 hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Events
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-shadow-md">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-x-6">
           <div className="col-span-1 md:order-2 mb-6">
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-500 mb-4 space-x-4",
                "[&>*]:p-5 [&>*]:border [&>*]:rounded-md [&>*]:shadow-sm [&>*]:w-full [&>*]:flex-col"
              )}
            >
              <div className="space-y-2">
                <Calendar className="text-blue-500" size={20} />
                <time className="text-lg font-medium">
                  <span>{eventDate.toLocaleDateString()}</span>
                  {", "}
                  <span>{`${hour}:${minute}`}</span>
                </time>
              </div>
              {!!event.venue ? (
                <div className="space-y-2">
                  <MapPin className="text-green-500" size={20} />
                  <span className="text-lg font-medium">{event.venue}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Globe className="" size={20} />
                  <span className="text-lg font-medium">Virtual</span>
                </div>
              )}
              <div className="space-y-2">
                <Tag className="text-yellow-500" size={20} />
                <span className="text-lg font-medium">
                  {event.categoryName}
                </span>
              </div>
              {typeof event.capacity === "number" && event.capacity > 0 && (
                <div className="space-y-2">
                  <Users size={20} className="text-orange-500" />
                  <span className="text-lg font-medium">
                    {event.capacity} seats available
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <div className="rounded-xl overflow-hidden mb-10 shadow-md">
              {event.coverImage && (
                <CloudinaryImage
                  src={event.coverImage?.secure_url}
                  alt={event.title}
                  className="w-full h-auto"
                  height={500}
                  width={800}
                />
              )}
            </div>
            <div className="prose prose-lg max-w-none ">
              <p className="text-lg leading-relaxed mb-6">{event.summary}</p>
              <RichTextPreview html={event.content.html} />
            </div>
          </div>
         
        </div>
      </section>
    </>
  );
}

export const generateStaticParams = async () => {
  try {
    const foundevents = await db.select({ slug: events.slug }).from(events);
    return foundevents.map((event) => ({ slug: event.slug }));
  } catch (e) {
    console.log(e);
    return [];
  }
};
