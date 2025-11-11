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
import { TMediaSchema } from "@/schemas/media.schema";
import { Copy } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

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

    // function handleUpload(media: TMediaSchema[]) {
    //     startTransition(async () => {
    //         try {
    //             await addMediaToGallery(g.id, media.map(m => m.id));
    //         } catch (e) {
    //             toast.error("An unexpected error occurred")
    //         }
    //     })
    // }

    if (!g.media.length) {
        return <div className="grid place-items-center">
            <MediaInput__Bulk
                onChange={media => {
                    console.log(media)
                }}
            />
        </div>
    }

    return (
        <div>
            {
                g.media.map(media => {
                    return (
                        <CloudinaryImage
                            src={media.secure_url}
                            alt={media.alt}
                            width={100}
                            height={100}
                            key={media.id}
                            className={cn(selectedItems.includes(media.id) && "border-2 border-primary")}
                        />
                    )
                })
            }
        </div>
    )
}