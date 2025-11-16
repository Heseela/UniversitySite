import { cn } from "@/lib/utils";
import { CardsBlockDto } from "@/schemas/page.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ELinkType } from "../../../../../types/global.types";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { ECardsBlockLayout } from "../../../../../types/blocks.types";
import isEmptyHTML from "@/lib/utilities/rich-text.utils";

export default function RenderCardsBlock({
    cards,
    colWidthLimit,
    layout,
}: CardsBlockDto) {
    return layout === ECardsBlockLayout.Grid ? (
        <GridLayout colWidthLimit={colWidthLimit}>
            <Cards cards={cards} />
        </GridLayout>
    ) : (
        <MassionaryLayout>
            <Cards cards={cards} />
        </MassionaryLayout>
    );
}

export function Cards({ cards }: { cards: CardsBlockDto["cards"] }) {
    return cards.map((card, index) => {
        const newTabProps = card.newTab
            ? { rel: "noopener noreferrer", target: "_blank" }
            : {};
        const href =
            card.link?.type === ELinkType.External
                ? card.link.url
                : card.link?.url?.startsWith("/")
                    ? card.link.url
                    : `/${card.link}`;

        return (
            <Card
                key={index}
                className={cn(
                    "overflow-hidden py-0 gap-0",
                    card.borderLess && "border-0"
                )}
            >
                {card.image?.secure_url && (
                    <CloudinaryImage
                        src={card.image.secure_url}
                        className="w-full h-64 object-cover"
                        {...card.image}
                        height={400}
                        width={400}
                    />
                )}
                {(card.title || card.subtitle) && (
                    <CardHeader className="px-8 pt-6">
                        {!!card.title?.length && (
                            <CardTitle className="sm:text-2xl leading-snug font-playfair">
                                {card.link?.url ? (
                                    <Link
                                        href={href}
                                        className="hover:underline"
                                        {...newTabProps}
                                    >
                                        {card.title}
                                    </Link>
                                ) : (
                                    card.title
                                )}
                            </CardTitle>
                        )}
                        {!!card.subtitle && (
                            <CardDescription>{card.subtitle}</CardDescription>
                        )}
                    </CardHeader>
                )}
                {!isEmptyHTML(card.description.html) && (
                    <CardContent className="md:p-8 p-6">
                        <RichTextPreview html={card.description.html} />
                    </CardContent>
                )}
            </Card>
        );
    });
}

export function GridLayout({
    children,
    colWidthLimit,
}: {
    children: React.ReactNode;
    colWidthLimit: CardsBlockDto["colWidthLimit"];
}) {
    return (
        <section
            className={cn(
                "grid gap-6",
            )}
            style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${colWidthLimit}px), 1fr))`
            }}
        >
            {children}
        </section>
    );
}

export function MassionaryLayout({ children }: { children: React.ReactNode }) {
    return <section className="xl:columns-4 md:columns-3 sm:columns-2 columns-1 gap-2 w-fit">{children}</section>;
}
