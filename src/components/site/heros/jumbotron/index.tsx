import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { EAlignment } from "../../../../../types/global.types";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";
import { THeroSectionDto } from "@/schemas/hero-section.schema";

export default function JumboTron({ hero }: { hero: THeroSectionDto }) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Jumbotron) return null;

  const alignment = hero.layout.alignment;

  return (
    <section
      className={cn(
        "w-full h-full flex items-center",
        hero.image?.secure_url ? "min-h-[600px]" : "min-h-[400px]"
      )}
      style={{
        background: hero.image?.secure_url
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${hero.image.secure_url}) no-repeat center center / cover`
          : undefined,
      }}
    >
      <section
        className={cn(
          "w-full container mx-auto flex flex-col justify-center mb-12 px-4 md:px-6",
          alignment === EAlignment.Left
            ? "items-start text-left"
            : alignment === EAlignment.Center
              ? "items-center text-center"
              : "items-end text-right"
        )}
      >
        <section className="[&_h1]:text-shadow-md [&_h1]:text-balance [&_p]:text-balance max-w-4xl">
          <RichTextPreview 
            className="mb-6 [&_h1]:text-4xl md:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:leading-tight [&_p]:text-lg md:[&_p]:text-xl [&_p]:text-gray-100"
            html={hero.headline.html} 
          />
        </section>
        {Array.isArray(hero.cta) && hero.cta.length > 0 && (
          <ul className={cn(
            "flex gap-4 mt-6",
            alignment === EAlignment.Center && "justify-center",
            alignment === EAlignment.Right && "justify-end"
          )}>
            {hero.cta.map((cta, index) => (
              <li key={index}>
                <CMSLink 
                  size={"lg"} 
                  {...cta}
                  className={cn(
                    "px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105",
                    cta.variant === "outline" && "border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                  )}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}