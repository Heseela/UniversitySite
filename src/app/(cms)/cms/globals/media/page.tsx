import { getMedia } from "@/lib/data-access.ts/media.data"
import { getPaginationQueryParams } from "@/lib/db-utils"
import MediaPage__Client from "./_client"

type Props = {
    searchParams: Promise<{
        page?: string
        pageSize?: string
        q?: string
    }>
}

export default async function MediaPage({ searchParams: searchParamsPromise }: Props) {
    const searchParams = await searchParamsPromise;

    const { page, pageSize } = getPaginationQueryParams(new URLSearchParams(searchParams));

    const result = await getMedia({
        q: searchParams.q,
        page,
        pageSize
    });

    return (
        <MediaPage__Client media={result} />
    )
}