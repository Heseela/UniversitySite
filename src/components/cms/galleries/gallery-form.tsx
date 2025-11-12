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
import { addMediaToGallery, removeMediaFromGallery } from "@/lib/actions/gallery.action";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import "./gallery.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";

type Props = {
    galleries: {
        id: string;
        category: {
            id: string;
            name: string;
        };
        media: TMediaSelect[];
    }[];
}

export default function GalleryView({ galleries }: Props) {

    return (
        <section className="container mx-auto space-y-10">
            <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Manage your gallery</h3>

            <section className="space-y-2">
                {
                    galleries.map(gallery => {
                        return <GalleryCategoryAccordion key={gallery.id} gallery={gallery} />
                    })
                }
            </section>

        </section>
    )
}

function GalleryCategoryAccordion({ gallery }: { gallery: Props["galleries"][0] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const hasAnySelected = selectedItems.length > 0;

    function handleRemoveSelected() {
        startTransition(async () => {
            try {
                await removeMediaFromGallery(selectedItems)
                setIsOpen(false);
                setSelectedItems([]);
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Unexpected Error", {
                        description: e.message,
                    });
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        })
    }

    return (
        <Accordion type="multiple">
            <AccordionItem value={gallery.id} className={cn("bg-secondary/50 border !border-b-1 rounded-md overflow-hidden")}>
                <section className="relative flex items-center gap-2 px-2">
                    <AccordionTrigger className="text-sm hover:no-underline py-2.5">
                        <section className="space-x-3">
                            <Badge className="capitalize">{gallery.category.name}</Badge>
                            <span className="text-muted-foreground">{gallery.media.length} items</span>
                        </section>
                    </AccordionTrigger>
                    <section className="absolute right-10 flex items-center gap-5">
                        {
                            hasAnySelected && (
                                <>
                                    <ResponsiveAlertDialog
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        title={`Remove ${selectedItems.length} items from gallery`}
                                        description="Are you sure want to remove selected items from gallery?"
                                        isLoading={isPending}
                                        action={handleRemoveSelected}
                                        actionLabel="Remove"
                                        loadingText="Removing..."
                                    />

                                    <Button
                                        size="sm"
                                        variant={"destructive"}
                                        disabled={!hasAnySelected}
                                        onClick={() => setIsOpen(true)}
                                    >
                                        Remove ({selectedItems.length} items)
                                    </Button>
                                </>
                            )
                        }

                        {
                            gallery.media.length > 0 && (
                                <section className="flex items-center gap-2">
                                    <Checkbox
                                        id={"selectAll" + gallery.id}
                                        checked={hasAnySelected && selectedItems.length === gallery.media.length}
                                        onCheckedChange={checked => checked ? setSelectedItems(gallery.media.map(m => m.id)) : setSelectedItems([])}
                                    />
                                    <Label htmlFor={"selectAll" + gallery.id}>
                                        Select All
                                    </Label>
                                </section>
                            )
                        }
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background">
                    <section className="space-y-3">
                        <GalleryItem g={gallery} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
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
    g: Props["galleries"][0],
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const [isPending, startTransition] = useTransition();
    const hasAnySelected = selectedItems.length > 0;

    const toggleSelected = (mediaId: string) => {
        setSelectedItems(prev => prev.includes(mediaId) ? prev.filter(id => id !== mediaId) : [...prev, mediaId])
    }

    return (
        <div className="@container">
            <section className="@3xl:columns-6 @2xl:columns-5 @xl:columns-4 @lg:columns-3 @md:columns-2 [&>*]:mb-3">
                {
                    g.media.map(media => {
                        const isSelected = selectedItems.includes(media.id);

                        return (
                            <div
                                key={media.id}
                                onClick={() => {
                                    if (hasAnySelected) {
                                        toggleSelected(media.id); // only toggle if any item is selected
                                    } else {
                                        window.open(media.secure_url, "_blank")
                                    }
                                }}
                                className={cn("group relative w-fit shadow-sm hover:shadow-lg transition-shadow", isSelected && "outline-3 outline-primary dark:outline-foreground")}
                            >
                                <CloudinaryImage
                                    src={media.secure_url}
                                    alt={media.alt}
                                    width={media.width}
                                    height={media.height}
                                    sizes="300px,400px"
                                    className="cursor-pointer"
                                    title={isSelected ? "Unselect" : hasAnySelected ? "Click to select" : "Click to view"}
                                />

                                <section className={cn("absolute top-2 right-2 hidden group-hover:block", hasAnySelected && "block")}>
                                    <Checkbox
                                        checked={isSelected}
                                        onClick={(e) => e.stopPropagation()}
                                        onCheckedChange={() => {
                                            setSelectedItems(prev => prev.includes(media.id) ? prev.filter(id => id !== media.id) : [...prev, media.id])
                                        }}
                                        className="shadow-lg bg-white rounded-full size-6"
                                        title={isSelected ? "Unselect" : "Select"}
                                    />
                                </section>
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