import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { EAlignment } from "../../../../../types/global.types";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";
import { THeroSectionDto } from "@/schemas/hero-section.schema";
import { ECtaVariant } from "../../../../../types/blocks.types";
import CloudinaryImage from "@/components/ui/cloudinary-image";

export default function JumboTron({ hero }: { hero: THeroSectionDto }) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Jumbotron) return null;

  const alignment = hero.layout.alignment;

  return (
    <section
      className="h-[80vh] max-h-[700px] relative overflow-hidden"
      aria-label="Hero section"
    >
      {hero.image?.secure_url && (
        <>
          <CloudinaryImage
            src={hero.image.secure_url}
            fill
            alt={hero.image.alt || "Hero background"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </>
      )}
      <section
        className={cn(
          "relative z-10 h-full container mx-auto flex flex-col justify-center mb-12",
          alignment === EAlignment.Left
            ? "items-start"
            : alignment === EAlignment.Center
              ? "items-center"
              : "items-end"
        )}
      >
        <section className="[&_h1]:text-shadow-md [&_h1]:text-balance [&_p]:text-balance">
          <RichTextPreview className="mb-6" html={hero.headline.html} />
        </section>
        {Array.isArray(hero.cta) && hero.cta.length > 0 && (
          <ul className="flex md:justify-center gap-4">
            {hero.cta.map((cta, index) => (
              <li key={index}>
                <CMSLink
                  size={"lg"}
                  {...cta}
                  className={cn(cta.variant === ECtaVariant.Gradient && "px-9! py-6! rounded-full! text-lg")}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
