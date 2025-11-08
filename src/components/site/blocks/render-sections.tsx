import { cn } from "@/lib/utils";
import { TPageDto } from "@/schemas/page.schema";
import { EBlock } from "../../../../types/blocks.types";
import RenderTextBlock from "./text";
import RenderCardsBlock from "./card";
import RenderImageBlock from "./image";
import RenderRefItems from "./ref";
import RenderFormBlock from "./form";
import { EAlignment } from "../../../../types/global.types";
import { RenderContactTextBlock } from "./contact";
import { RenderTestimonialBlock } from "./testimonials";
import { RenderMapBlock } from "./map";
import { RenderPartnerBlock } from "./partner";
import { RenderCertificationBlock } from "./certification";
import { RenderAlumniBlock } from "./alumni";
import { RenderFaqBlock } from "./faq";
import { FC } from "react";
import RenderTimelineBlock from "./timeline";

type Props = {
  sections: TPageDto["sections"];
};

const blockToRender: Record<EBlock, FC<any>> = {
  [EBlock.Text]: RenderTextBlock,
  [EBlock.Cards]: RenderCardsBlock,
  [EBlock.Image]: RenderImageBlock,
  [EBlock.RefItem]: RenderRefItems,
  [EBlock.Form]: RenderFormBlock,
  [EBlock.ContactText]: RenderContactTextBlock,
  [EBlock.Testimonial]: RenderTestimonialBlock,
  [EBlock.Partner]: RenderPartnerBlock,
  [EBlock.Faq]: RenderFaqBlock,
  [EBlock.Alumni]: RenderAlumniBlock,
  [EBlock.Certification]: RenderCertificationBlock,
  [EBlock.Map]: RenderMapBlock,
  [EBlock.Timeline]: RenderTimelineBlock
}

export default function RenderSections({ sections }: Props) {
  return (
    <section>
      {sections.map((s, idx) => {
        const blocksLayoutClassName =
          s.blocks?.direction === "horizontal"
            ? "grid grid-cols-1 md:grid-cols-[repeat(var(--cols),_minmax(0,1fr))] gap-12"
            : "space-y-4";

        return (
          <section
            key={idx}
            className={cn(
              "py-20 relative even:bg-gray-50 first:!pt-20",
            )}
            style={
              {
                "--cols": s.blocks?.items.length,
              } as React.CSSProperties
            }
          >
            <section className={"container mx-auto"}>
              {
                (!!s.headline || !!s.tagline || !!s.subheadline) && (
                  <div
                    className={cn(
                      "mb-10 flex flex-col gap-3",
                      s.headlineAlignment === EAlignment.Left
                        ? "justify-start items-start"
                        : s.headlineAlignment === EAlignment.Center
                          ? "justify-center items-center"
                          : "justify-end items-end"
                    )}
                  >
                    <SectionTagline {...s} />
                    <SectionHeadline {...s} />
                    <SectionSubHeadline {...s} />
                  </div>
                )
              }
              <section className={cn(blocksLayoutClassName)}>
                {
                  s.blocks?.items?.map((b, idx) => {
                    const BlockToRender = blockToRender[b.type];

                    // a different case for the Map block
                    if (b.type === EBlock.Map) {
                      return (
                        <div className={cn(s.blocks?.items?.length === 1 ? "min-h-[400px]" : "h-full")}>
                          <div className={cn(s.blocks?.items?.length === 1 && 'absolute inset-0')}>
                            <RenderMapBlock key={idx} {...b} />
                          </div>
                        </div>
                      )
                    }

                    return <BlockToRender key={idx} {...b} />
                  })
                }
              </section>
            </section>
          </section>
        );
      })}
    </section>
  );
}

function SectionTagline(s: TPageDto["sections"][0]) {
  if (!s.tagline) return null;

  return (
    <span className="text-primary font-semibold">
      {s.tagline}
    </span>
  )
}

function SectionHeadline(s: TPageDto["sections"][0]) {
  if (!s.headline) return null;

  return (
    <h2
      className={cn(
        "text-4xl font-bold text-primary",
        s.headlineAlignment === EAlignment.Left
          ? "text-left"
          : s.headlineAlignment === EAlignment.Center
            ? "text-center"
            : "text-right"
      )}
    >
      {s.headline}
    </h2>
  )
}

function SectionSubHeadline(s: TPageDto["sections"][0]) {
  if (!s.subheadline) return null;

  return (
    <p
      className={cn(
        "text-muted-foreground max-w-6xl text-balance",
        s.headlineAlignment === EAlignment.Left
          ? "text-left"
          : s.headlineAlignment === EAlignment.Center
            ? "text-center"
            : "text-right"
      )}
    >
      {s.subheadline}
    </p>
  )
}