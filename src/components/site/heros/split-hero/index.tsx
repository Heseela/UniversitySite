import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { RenderHeroProps } from "../render-hero";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { EAlignmentExcludeCenter } from "../../../../../types/global.types";

export default function SplitHero({ hero }: RenderHeroProps) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Split_Hero) return null;

  const imagePosition = hero.layout.imagePosition;
  const imageUrl = hero.image?.secure_url;

  return (
    <section className={cn("relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-cream")}>
      <div
        className={cn(
          "mx-auto container flex flex-col xl:flex-row items-center gap-10",
        )}
      >
        {imageUrl && (
          <div className={cn(
            "flex justify-center items-center w-full md:flex-1 mb-6 md:mb-0",
            imagePosition === EAlignmentExcludeCenter.Right && "order-2"
          )}>
            <CloudinaryImage
              className="w-full rounded-2xl h-auto object-cover"
              src={imageUrl}
              width={500}
              height={300}
              alt={hero.image?.alt || "Image"}
            />
          </div>
        )}

        <div className="w-full space-y-12 md:flex-1">
          <section className="[&_h1]:text-shadow-md [&_h1]:text-balance [&_p]:text-balance">
            <RichTextPreview className="mb-8" html={hero.headline.html} />
          </section>
          {Array.isArray(hero.cta) && hero.cta.length > 0 && (
            <ul className="flex gap-4">
              {hero.cta.map((cta, index) => (
                <li key={index}>
                  <CMSLink
                    size={"lg"}
                    {...cta}
                    className={cn(
                      "!px-8 py-6 text-base border-2",
                      cta.variant === "outline" && "bg-transparent border-primary text-primary",
                      cta.variant === "default" && "border-primary"
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
