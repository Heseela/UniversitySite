import GalleryView from "@/components/cms/galleries/gallery-form";
import { db } from "@/db";
import { categories, CategoryType } from "@/db/schema/category";
import { galleriesTable } from "@/db/schema/gallery";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";

export default async function GalleryPage() {
    const categoriesPromise = db
        .select()
        .from(categories)
        .where(eq(categories.type, CategoryType.GALLERY));

    const galleryPromise = db.query.galleriesTable.findMany({
        with: {
            media: true,
        }
    })

    const [galleryCategories, gallery] = await Promise.all([categoriesPromise, galleryPromise]);

    if (!galleryCategories.length) {
        return (
            <div>No categories for gallery. Please add one.</div>
        )
    }

    return (
        <GalleryView galleryCategories={galleryCategories} gallery={gallery} />
    )
}