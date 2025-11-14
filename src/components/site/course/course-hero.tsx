import CloudinaryImage from "@/components/ui/cloudinary-image";
import { TCourseTableSelect } from "@/db/schema/courses";

export default function CourseHero({
  name,
  coverImage,
}: Pick<TCourseTableSelect, "name" | "coverImage">) {
  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative pb-8">
        <div className="">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-medium text-shadow-md">
            {name}
          </h1>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {coverImage && (
          <CloudinaryImage
            fill
            priority
            src={coverImage.secure_url}
            alt={name}
            className="object-cover"
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}