import { TEventsResponse_Public } from "../../../../types/event.types";
import {
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  User,
} from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";

type Props = {
  event: TEventsResponse_Public[0];
};

export default function EventCard({ event }: Props) {
  const eventDate = new Date(event.eventDate);

  const hour = eventDate.getHours().toString().padStart(2, "0");
  const minute = eventDate.getMinutes().toString().padStart(2, "0");

  return (
    <article className="@container">
      <div className="h-full card shadow-sm rounded-b-xl p-0 overflow-hidden">
        <div className="flex flex-col @2xl:flex-row h-full">
          <div className="@2xl:w-1/3 @4xl:w-1/4">
            {event.coverImage && (
              <CloudinaryImage
                crop="auto"
                src={event.coverImage?.secure_url}
                alt={event.title}
                width={400}
                height={300}
                className="w-full h-[300px] @2xl:h-full @2xl:max-w-[400px] object-cover"
              />
            )}
          </div>

          <div className="grow flex flex-col p-6">
            <Badge variant="outline" className="text-primary mb-1 border-primary">
              {event.categoryName}
            </Badge>

            <h3 className="text-xl font-bold mb-2">{event.title}</h3>

            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600 mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{`${hour}:${minute}`}</span>
              </div>

              {!!event.venue ? (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{event.venue}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Globe size={16} className="mr-1" />
                  <span>Virtual</span>
                </div>
              )}

              {typeof event.capacity === "number" && event.capacity > 0 && (
                <div className="flex items-center">
                  <User size={16} className="mr-1" />

                  <span>{event.capacity} seats available</span>
                </div>
              )}
            </div>

            <p className="text-slate-600 mb-6 line-clamp-2 @2xl:max-w-[80ch]">
              {event.summary}
            </p>

            <Button
              asChild
              variant="outline"
              size={"lg"}
              className="mt-auto flex w-fit py-6 px-40 bg-transparent  border-2 border-primary text-primary "
            >
              <Link href={"/events/" + event.slug}>
                More Details <ExternalLink size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <article className="@container">
      <div className="h-full card shadow-sm rounded-b-xl p-0 overflow-hidden">
        <div className="flex flex-col @2xl:flex-row h-full">
          {/* Image skeleton */}
          <div className="@2xl:w-1/3 @4xl:w-1/4">
            <Skeleton className="w-full h-[250px] @2xl:h-full @2xl:max-w-[400px] rounded-none" />
          </div>

          {/* Content skeleton */}
          <div className="grow flex flex-col p-6">
            {/* Badge skeleton */}
            <Skeleton className="h-5 w-24 mb-1" />

            {/* Title skeleton */}
            <Skeleton className="h-7 w-3/4 mb-2" />

            {/* Event details skeleton */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            {/* Summary skeleton */}
            <div className="mb-6 space-y-2">
              <Skeleton className="h-4 w-full @2xl:max-w-[80ch]" />
              <Skeleton className="h-4 w-5/6 @2xl:max-w-[80ch]" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="mt-auto h-14 w-64" />
          </div>
        </div>
      </div>
    </article>
  )
}
