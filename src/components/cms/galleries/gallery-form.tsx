"use client";

import { MediaInput } from "@/components/media/media-field";
import { MediaInput__Bulk } from "@/components/media/media-field-multi-select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { CategoriesSelect } from "@/db/schema/category";
import { TMediaSelect } from "@/db/schema/media";
import { addMediaToGallery } from "@/lib/actions/gallery.action";
import { cn } from "@/lib/utils";
import { Copy, LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import "./gallery.css";

type Props = {
    galleryCategories: CategoriesSelect[];
    gallery: {
        id: string;
        categoryId: string;
        media: TMediaSelect[];
    }[];
}

export default function GalleryView({ galleryCategories, gallery }: Props) {

    return (
        <section className="container mx-auto space-y-10">
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Manage your gallery</h3>

            <section className="space-y-2">
                {
                    galleryCategories.map(gc => {
                        const filteredGallery = gallery.filter(g => g.categoryId === gc.id);
                        return <GalleryCategoryAccordion key={gc.id} gallery={filteredGallery} gc={gc} />

                    })
                }
            </section>

        </section>
    )
}

function GalleryCategoryAccordion({ gallery, gc }: { gc: CategoriesSelect, gallery: Props["gallery"] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <Accordion type="multiple">
            <AccordionItem value={gc.id} className={cn("bg-secondary/50 border !border-b-1 rounded-md overflow-hidden")}>
                <section className="relative flex items-center gap-2 px-2">
                    <AccordionTrigger className="text-sm hover:no-underline py-2.5">
                        <section className="space-x-3">
                            <Badge className="capitalize">{gc.name}</Badge>
                        </section>
                    </AccordionTrigger>
                    <section className="absolute right-10">
                        <Copy className="w-4 h-4" />
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background">
                    <section className="space-y-3">
                        {
                            gallery.map(g => <GalleryItem key={g.id} g={g} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />)
                        }
                    </section>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

function GalleryItem({
    g,
    selectedItems,
    setSelectedItems
}: {
    g: Props["gallery"][0],
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <div>
            <section className="columns-6 [&>*]:mb-3">
                {
                    g.media.map(media => {
                        return (
                            <div
                                key={media.id}
                                onClick={() => setSelectedItems(prev => prev.includes(media.id) ? prev.filter(id => id !== media.id) : [...prev, media.id])}
                                className={cn("w-fit", selectedItems.includes(media.id) && "outline-3 outline-primary")}
                            >
                                <CloudinaryImage
                                    src={media.secure_url}
                                    alt={media.alt}
                                    width={media.width}
                                    height={media.height}
                                    sizes="300px,400px"
                                    className={cn("shadow-sm")}
                                />
                            </div>
                        )
                    })
                }
            </section>

            <div className="grid place-items-center h-17 mt-8">
                {
                    isPending ? (
                        <>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <LoaderCircle className="animate-spin" size={16} />
                                Adding images to gallery...
                            </p>
                        </>
                    ) : (
                        <MediaInput__Bulk
                            onChange={media => {
                                startTransition(async () => {
                                    try {
                                        await addMediaToGallery(g.id, media.map(m => m.id));
                                    } catch (e) {
                                        toast.error("An unexpected error occurred")
                                    }
                                })
                            }}
                            defaultSelected={g.media}
                        />
                    )
                }
            </div>
        </div>
    )
}