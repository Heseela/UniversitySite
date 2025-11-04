import ContainerLayout from "@/components/cms/container-layout"
import NewPageButton from "@/components/cms/pages/page/new-page-btn"
import PagesList from "@/components/cms/pages/page/pages-list"
import { Suspense } from "react"
import { TDataSearchParams } from "../../../../../types/global.types"

export type PagesPageProps = {
    searchParams: Promise<TDataSearchParams>
}

export default async function PagesPage(props: PagesPageProps) {
    return (
        <ContainerLayout
            title='Pages'
            description="Manage your site pages here."
            actionTrigger={
                <NewPageButton />
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <PagesList {...props} />
            </Suspense>
        </ContainerLayout>
    )
}