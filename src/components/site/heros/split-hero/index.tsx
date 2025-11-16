import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { EAlignmentExcludeCenter } from "../../../../../types/global.types";
import { THeroSectionDto } from "@/schemas/hero-section.schema";

export default function SplitHero({ hero }: { hero: THeroSectionDto }) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Split_Hero) return null;

  const imagePosition = hero.layout.imagePosition;
  const imageUrl = hero.image?.secure_url;

  return (
    <section className={cn("w-full h-full flex items-center py-12 md:py-20")}>
      <div className={cn(
        "mx-auto container flex flex-col xl:flex-row items-center gap-8 md:gap-12 h-full",
        imageUrl ? "min-h-[500px]" : "min-h-[300px]"
      )}>
        {imageUrl && (
          <div className={cn(
            "flex justify-center items-center w-full xl:flex-1 mb-6 xl:mb-0",
            imagePosition === EAlignmentExcludeCenter.Right && "xl:order-2"
          )}>
            <CloudinaryImage
              className="w-full max-w-2xl rounded-2xl h-auto object-cover shadow-2xl"
              src={imageUrl}
              width={600}
              height={400}
              alt={hero.image?.alt || "Hero image"}
            />
          </div>
        )}

        <div className={cn(
          "w-full space-y-8",
          imageUrl ? "xl:flex-1" : "max-w-4xl mx-auto text-center"
        )}>
          <section className="[&_h1]:text-shadow-md [&_h1]:text-balance [&_p]:text-balance">
            <RichTextPreview 
              className="mb-6 [&_h1]:text-4xl md:[&_h1]:text-5xl [&_h1]:font-bold [&_h1]:leading-tight [&_p]:text-lg md:[&_p]:text-xl"
              html={hero.headline.html} 
            />
          </section>
          {Array.isArray(hero.cta) && hero.cta.length > 0 && (
            <ul className={cn(
              "flex flex-wrap gap-4",
              !imageUrl && "justify-center"
            )}>
              {hero.cta.map((cta, index) => (
                <li key={index}>
                  <CMSLink
                    size={"lg"}
                    {...cta}
                    className={cn(
                      "px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105",
                      cta.variant === "outline" && "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
                      cta.variant === "default" && "border-2 border-primary"
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