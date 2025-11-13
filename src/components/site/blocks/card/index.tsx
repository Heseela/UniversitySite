import { cn } from '@/lib/utils'
import { CardsBlockDto } from '@/schemas/page.schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ELinkType } from '../../../../../types/global.types'
import CloudinaryImage from '@/components/ui/cloudinary-image'
import { RichTextPreview } from '@/components/editor/blocks/editor-x/rich-text-preview'
import isEmptyHTML from '@/lib/utilities/isEmptyHTML'

export default function RenderCardsBlock({
    cards,
    columns,
}: CardsBlockDto) {

    return (
        <section
            className={cn(
                "grid grid-cols-1 gap-6",
                "sm:grid-cols-[repeat(var(--cols-sm),_minmax(0,1fr))]",
                "md:grid-cols-[repeat(var(--cols-md),_minmax(0,1fr))]",
                "lg:grid-cols-[repeat(var(--cols-lg),_minmax(0,1fr))]",
                "xl:grid-cols-[repeat(var(--cols-xl),_minmax(0,1fr))]",
            )}
            style={{
                "--cols-sm": columns.sm,
                "--cols-md": columns.md,
                "--cols-lg": columns.lg,
                "--cols-xl": columns.xl
            } as React.CSSProperties}
        >
            {
                cards.map((card, index) => {
                    const newTabProps = card.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
                    const href = card.link?.type === ELinkType.External
                        ? card.link.url
                        : card.link?.url?.startsWith("/")
                            ? card.link.url
                            : `/${card.link}`

                    const hasImage = card.image?.secure_url

                    return (
                        <Card
                            key={index}
                            className={cn(
                                "overflow-hidden gap-0 py-0",
                                card.borderLess && "border-0"
                            )}
                        >
                            {
                                hasImage && card.image && (
                                    <CloudinaryImage
                                        src={card.image.secure_url}
                                        className='w-full h-64 object-cover'
                                        alt={card.image.alt || ''}
                                        width={card.image.width}
                                        height={card.image.height}
                                    />
                                )
                            }
                            {card.title && (
                                <CardHeader className='px-8'>
                                    <CardTitle className='sm:text-2xl leading-snug font-manrope'>
                                        {
                                            card.link?.url
                                                ? (
                                                    <Link href={href} className="hover:underline" {...newTabProps}>
                                                        {card.title}
                                                    </Link>
                                                )
                                                : card.title
                                        }
                                    </CardTitle>
                                </CardHeader>
                            )}
                            <CardContent className='px-8 py-8'>
                                <p className='text-muted-foreground'>{card.subtitle}</p>
                                <RichTextPreview html={card.description.html} />
                            </CardContent>
                        </Card>
                    )
                })
            }
        </section >
    )
}