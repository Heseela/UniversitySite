import { db } from "@/db";
import { pages } from "@/db/schema/page";
import { eq } from "drizzle-orm";
import { TPage } from "../../../../../../types/page.types";
import PageForm from "@/components/cms/pages/page/page-form";

type Props = {
    params: Promise<{
        id: string
    }>,
    searchParams: Promise<{
        tab?: string
    }>
}

export default async function PageEditPage({ params, searchParams }: Props) {
    const { id } = await params;
    const { tab } = await searchParams;

    const foundPage: TPage | undefined = await db.query.pages.findFirst({
        where: eq(pages.id, id),
    });

    if (!foundPage) {
        return (
            <div>Page not found</div>
        )
    }

    return (
        <PageForm
            page={foundPage}
            defaultTab={tab}
        />
    )
}