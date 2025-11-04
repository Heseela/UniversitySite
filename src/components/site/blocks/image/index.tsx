import CloudinaryImage from "@/components/ui/cloudinary-image";
import { cn } from "@/lib/utils";
import { ImageBlockDto } from "@/schemas/page.schema";

export default function RenderImageBlock({
    images,
}: ImageBlockDto) {
    const layoutClassName = images.length === 1
        ? "w-full flex justify-center items-center"
        : "grid grid-cols-2 gap-4";

    return (
        <div className={cn("border-red-500", layoutClassName)}>
            {images.map((image, idx) => {
                return (
                    <CloudinaryImage
                        key={idx}
                        className="rounded-md w-full h-auto object-cover"
                        src={image.secure_url}
                        width={image.width}
                        height={image.height}
                        alt={image.alt || "Image"}
                    />
                )
            })}
        </div>
    )
}