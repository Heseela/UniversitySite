import ContainerLayout from "@/components/cms/container-layout"
import { Suspense } from "react"
import { TDataSearchParams } from "../../../../../types/global.types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import TeamsList from "@/components/cms/pages/teams/teams-list"

export type TeamsPageProps = {
    searchParams: Promise<TDataSearchParams>
}

export default async function TeamsPage(props: TeamsPageProps) {
    return (
        <ContainerLayout
            title='Teams'
            description="Manage your team members here."
            actionTrigger={
                <Button size={"lg"} asChild>
                    <Link href="teams/new">
                        <Plus />
                        Add New
                    </Link>
                </Button>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <TeamsList {...props} />
            </Suspense>
        </ContainerLayout>
    )
}