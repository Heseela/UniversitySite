import GalleryView from "@/components/cms/galleries/gallery-form";
import { db } from "@/db";

export default async function GalleryPage() {
    const galleries = await db.query.galleriesTable.findMany({
        with: {
            media: true,
            category: true
        }
    })

    if (!galleries.length) {
        return (
            <div className="container mx-auto h-80 grid place-items-center text-muted-foreground">No categories for gallery. Please add one.</div>
        )
    }

    return (
        <GalleryView galleries={galleries} />
    )
}