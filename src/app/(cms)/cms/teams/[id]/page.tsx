import TeamForm from "@/components/cms/pages/teams/team-form"
import { getTeamById } from "@/lib/data-access.ts/teams.data";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>
}

export default async function EditTeamPage({ params }: Props) {
    const { id } = await params;

    const team = await getTeamById(id);

    if (!team) return notFound();

    return (
        <TeamForm defaultValues={team} />
    )
}