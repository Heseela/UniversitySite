import CloudinaryImage from "@/components/ui/cloudinary-image";
import { cn } from "@/lib/utils";
import { ImageBlockDto } from "@/schemas/page.schema";

export default function RenderImageBlock({
  images,
}: ImageBlockDto) {
  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <CloudinaryImage
          className="w-full h-auto rounded-2xl shadow-lg"
          src={images[0].secure_url}
          width={images[0].width}
          height={images[0].height}
          alt={images[0].alt || "Image"}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 h-[400px]">
      {images.map((image, idx) => (
        <div
          key={idx}
          className={cn(
            "relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl",
            idx === 0 && "h-3/4 self-start",
            idx === 1 && "h-3/4 self-end"
          )}
        >
          <CloudinaryImage
            className="w-full h-full object-cover"
            src={image.secure_url}
            width={image.width}
            height={image.height}
            alt={image.alt || "Image"}
          />
        </div>
      ))}
    </div>
  )
}