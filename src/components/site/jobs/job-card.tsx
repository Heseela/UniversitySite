import { TJobResponse_Public } from "../../../../types/job.types";
import { Building, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { APPLY_FOR_JOB_SLUG } from "@/app/slugs";
import { cn } from "@/lib/utils";

type Props = {
  job: TJobResponse_Public[0];
};

export default function JobCard({ job }: Props) {
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "part-time":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "internship":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "contract":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExcerpt = () => {
    if (job.excerpt) return job.excerpt;

    if (job.description && typeof job.description === 'object') {
      const textContent = extractPlainText(job.description);
      return textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');
    }

    return "Join our team and make a difference in education.";
  };

  const extractPlainText = (richText: any): string => {
    if (!richText) return '';

    if (richText.content && Array.isArray(richText.content)) {
      return richText.content
        .map((node: any) => node.content?.map((text: any) => text.text).join('') || '')
        .join(' ')
        .slice(0, 150);
    }

    return '';
  };

  return (
    <article className="@container">
      <div className="h-full card shadow-sm rounded-xl p-0 overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex flex-col @2xl:flex-row h-full">
          {/* Job Content */}
          <div className="grow flex flex-col p-6">
            <div className="flex flex-col @lg:flex-row @lg:justify-between @lg:items-start gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Building size={16} className="mr-2 flex-shrink-0" />
                    <span className="font-medium">{job.department}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={cn("capitalize border", getJobTypeColor(job.type))}>
                {job.type.replace('-', ' ')}
              </Badge>
              <Badge className={cn(
                "capitalize border",
                job.status === 'open' 
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              )}>
                {job.status}
              </Badge>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-3 @2xl:max-w-[80ch] text-sm leading-relaxed">
              {getExcerpt()}
            </p>

            <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 flex-shrink-0" />
                <span>Posted {formatDate(job.createdAt)}</span>
              </div>
              
              {job.updatedAt && job.updatedAt !== job.createdAt && (
                <div className="flex items-center">
                  <Clock size={14} className="mr-2 flex-shrink-0" />
                  <span>Updated {formatDate(job.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function JobCardSkeleton() {
  return (
    <article className="@container">
      <div className="h-full card shadow-sm rounded-xl p-0 overflow-hidden border border-gray-200">
        <div className="flex flex-col @2xl:flex-row h-full">
          {/* Content skeleton */}
          <div className="grow flex flex-col p-6">
            {/* Header skeleton */}
            <div className="flex flex-col @lg:flex-row @lg:justify-between @lg:items-start gap-4 mb-4">
              <div className="flex-1">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <div className="flex flex-wrap gap-4 mb-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-24 @lg:w-32" />
            </div>

            {/* Badges skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Date skeleton */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 rounded mr-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 rounded mr-2" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}