import { TCoursesResponse_Public } from "../../../../types/course.types";
import { Clock, Award, Users, BookOpen } from "lucide-react";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  course: TCoursesResponse_Public[0];
  className?: string;
};

export default function CourseCard({ course, className }: Props) {
  const features = [
    course.duration && `${course.duration} months duration`,
    course.degree && `${course.degree} Degree`,
    course.faculty && `Faculty of ${course.faculty}`,
    course.eligibility && `Eligibility: ${course.eligibility}`,
  ].filter(Boolean) as string[];

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col",
        className
      )}
    >
      <div className="relative h-60 w-full">
        {course.coverImage ? (
          <CloudinaryImage
            crop="auto"
            src={course.coverImage.secure_url}
            alt={course.name}
            width={400}
            height={240}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <BookOpen size={48} className="text-blue-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {course.duration && (
          <Badge className="absolute bottom-4 left-4 bg-[var(--pinkish)] text-white px-3 py-1 rounded-full text-sm font-medium border-0">
            <Clock size={14} className="mr-1" />
            {course.duration} years
          </Badge>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {course.categoryName && (
          <Badge variant="secondary" className="w-fit mb-3">
            {course.categoryName}
          </Badge>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {course.name}
        </h3>

        {course.summary && (
          <p className="text-gray-600 mb-5 line-clamp-3 flex-grow">
            {course.summary}
          </p>
        )}

        {/* <div className="space-y-2 mb-4">
          {course.degree && (
            <div className="flex items-center text-sm text-gray-700">
              <Award size={16} className="mr-2 text-primary flex-shrink-0" />
              <span className="font-medium">{course.degree}</span>
            </div>
          )}
          {course.faculty && (
            <div className="flex items-center text-sm text-gray-700">
              <Users size={16} className="mr-2 text-green-600 flex-shrink-0" />
              <span>Faculty of {course.faculty}</span>
            </div>
          )}
        </div> */}

        {features.length > 0 && (
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Program Features
            </h4>
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          asChild
          className="mt-6 w-full bg-primary hover:bg-blue-700 text-white py-2 transition-colors"
        >
          <Link href={`/courses/${course.slug}`}>
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      <Skeleton className="w-full h-60 rounded-none" />
      
      <div className="p-6 flex flex-col flex-grow">
        <Skeleton className="h-5 w-20 mb-3" />
        
        <Skeleton className="h-6 w-3/4 mb-3" />
        
        <div className="space-y-2 mb-5 flex-grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 rounded-full mr-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 rounded-full mr-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="space-y-2">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-3 w-28" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 rounded-full mr-2" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        </div>

        <Skeleton className="h-10 w-full mt-6" />
      </div>
    </div>
  );
}