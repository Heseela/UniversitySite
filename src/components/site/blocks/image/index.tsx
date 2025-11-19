import CloudinaryImage from "@/components/ui/cloudinary-image";
import { cn } from "@/lib/utils";
import { TMediaSchema } from "@/schemas/media.schema";
import { ImageBlockDto } from "@/schemas/page.schema";

export default function RenderImageBlock({
  images,
}: ImageBlockDto) {

  if (images.length === 1) {
    return (
      <div className="flex justify-center">
        <CloudinaryImage
          className="w-full h-auto rounded-2xl shadow-lg object-cover"
          src={images[0].secure_url}
          width={images[0].width}
          height={images[0].height}
          alt={images[0].alt || "Image"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="@container">
        <div className="h-full grid @lg:grid-cols-2 gap-4">
          <ImageItem image={images[0]} className="w-full h-auto @lg:self-start" />
          <ImageItem image={images[1]} className="w-full h-auto @lg:self-end" />
        </div>
      </div>
    )
  }

  if (images.length === 3) {
    return (
      <div className="@container">
        <div className="h-full grid @xl:grid-cols-2 gap-4">
          <ImageItem image={images[0]} />
          <div className="grid @xl:grid-rows-2 grid-cols-2 @xl:grid-cols-none gap-4">
            <ImageItem image={images[1]} />
            <ImageItem image={images[2]} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid @xl:grid-cols-2 gap-4">
      {images.map((image, idx) => (
        <ImageItem key={idx} image={image} />
      ))}
    </div>
  )
}

function ImageItem({ image, className }: { image: TMediaSchema; className?: string }) {
  return (
    <CloudinaryImage
      className={cn("w-full h-full object-cover rounded-xl", className)}
      src={image.secure_url}
      width={image.width}
      height={image.height}
      alt={image.alt || "Image"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}