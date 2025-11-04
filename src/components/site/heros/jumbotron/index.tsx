import { cn } from "@/lib/utils";
import { RenderHeroProps } from "../render-hero";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { EAlignment } from "../../../../../types/global.types";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import CMSLink from "@/components/ui/cms-link";

export default function JumboTron({ hero }: RenderHeroProps) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Jumbotron) return null;

  const alignment = hero.layout.alignment;

  return (
    <section
      className={cn(
        "bg-cream h-[80vh] max-h-[400px]",
        hero.image?.secure_url && "h-[80vh] max-h-[600px]",
      )}
      style={{
        background: hero.image?.secure_url
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${hero.image.secure_url}) no-repeat center center / cover`
          : undefined,
      }}
    >
      <section
        className={cn(
          "h-full container mx-auto flex flex-col justify-center mb-12",
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
                <CMSLink size={"lg"} {...cta} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
