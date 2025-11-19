import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TJobResponse_Public } from "../../../../../types/job.types";
import { gridClassName } from ".";
import { cn } from "@/lib/utils";
import { Building, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface JobsBlockProps extends RefItemBlockDto {
    refRelation: ERefRelation.Jobs;
}

export default async function JobsBlock({
    limit,
    order,
    selected,
    cols = 1
}: JobsBlockProps) {
    const urlSearchParams = new URLSearchParams({
        limit: limit?.toString() || "10",
        order: order || "ASC",
        status: "open"
    });

    if (selected?.length) {
        urlSearchParams.set("slugs", selected.map((s) => s.value).join(","));
    }

    const res = await serverFetch(`/jobs?${urlSearchParams.toString()}`, {
        next: {
            revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC || "3600")
        },
    });

    if (!res.ok) return null;

    const jobs: TJobResponse_Public = await res.json();

    console.log("Jobs data fetched:", jobs);

    if (!jobs.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No job openings available at the moment.
            </div>
        );
    }

    return (
        <>
            <section className={cn(
                "grid gap-6",
                gridClassName[cols as keyof typeof gridClassName]
            )}>
                {jobs.map((job) => {
                    return <JobCard key={job.slug} job={job} />;
                })}
            </section>
        </>
    );
}

type JobCardProps = {
    job: TJobResponse_Public[0];
    className?: string;
};

function JobCard({ job, className }: JobCardProps) {
    const getJobTypeColor = (type: string) => {
        switch (type) {
            case "full-time":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "part-time":
                return "bg-green-100 text-green-800 border-green-200";
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
        <div
            className={cn(
                "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col border border-gray-200",
                className
            )}
        >
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {job.title}
                        </h2>

                        <div className="flex items-center text-gray-600 mb-3">
                            <Building size={16} className="mr-2 flex-shrink-0" />
                            <span className="text-sm font-medium">{job.department}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={cn("capitalize border", getJobTypeColor(job.type))}>
                        {job.type.replace('-', ' ')}
                    </Badge>
                    <Badge className="capitalize bg-pink-100 border border-pink-200 text-pinkish">
                        {job.status}
                    </Badge>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow text-sm">
                    {getExcerpt()}
                </p>

                <div className="space-y-2 mb-6 text-sm text-gray-500">
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
    );
}

export function JobCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-200">
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-4 rounded mr-2" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export function JobsBlockSkeleton({ cols = 1 }: { cols?: number }) {
    return (
        <section className={cn(
            "grid gap-6",
            gridClassName[cols as keyof typeof gridClassName]
        )}>
            {Array.from({ length: cols * 2 }).map((_, index) => (
                <JobCardSkeleton key={index} />
            ))}
        </section>
    );
}