import MediaForm from "@/components/cms/media/media.form";
import { db } from "@/db";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string // public_id
    }>
}

export default async function SingleMediaPage({ params }: Props) {
    const { id } = await params;

    const foundMedia = await db.query.media.findFirst({ where: eq(media.public_id, id) });

    if (!foundMedia) notFound()

    return (
        <MediaForm media={foundMedia} />
    )
}