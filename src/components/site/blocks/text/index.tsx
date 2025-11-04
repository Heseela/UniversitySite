import { cn } from "@/lib/utils";
import { TextBlockDto } from "@/schemas/page.schema";
import { EAlignment } from "../../../../../types/global.types";
import CMSLink from "@/components/ui/cms-link";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import isEmptyHTML from "@/lib/utilities/isEmptyHTML";

export default function RenderTextBlock({
  align,
  body,
  cta,
  headline,
  subheadline,
}: TextBlockDto) {
  const textAlignClassName =
    align === EAlignment.Center
      ? "text-center"
      : align === EAlignment.Right
        ? "text-right"
        : "text-left";

  return (
    <section>
      {
        !!headline && !!subheadline && (
          <div
            className={cn(
              "flex flex-col gap-2 mb-12",
              align === EAlignment.Center
                ? "items-center justify-center text-center"
                : align === EAlignment.Right && "items-end"
            )}
          >
            {
              !!headline && (
                <h2
                  className={cn(
                    "text-4xl font-bold",
                    align === EAlignment.Center ? "" : "w-full text-left"
                  )}
                >
                  {headline}
                </h2>
              )
            }
            {
              !!subheadline && (
                <p
                  className={cn(
                    "text-muted-foreground max-w-6xl",
                    textAlignClassName
                  )}
                >
                  {subheadline}
                </p>
              )
            }
          </div>
        )
      }
      <section>
        <RichTextPreview html={body.html} />
      </section>
      {Array.isArray(cta) && cta.length > 0 && (
        <ul
          className={cn(
            "flex gap-4 mt-10",
            align === EAlignment.Center
              ? "justify-center"
              : align === EAlignment.Right && "justify-end"
          )}
        >
          {cta.map((cta, index) => (
            <li key={index}>
              <CMSLink size={"lg"} {...cta} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
