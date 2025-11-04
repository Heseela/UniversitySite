import ContainerLayout from "@/components/cms/container-layout";
import { TDataSearchParams } from "../../../../../../../types/global.types";
import { getFormById } from "@/lib/data-access.ts/forms.data";
import { redirect } from "next/navigation";
import FormSubmissionsList from "@/components/cms/forms/form-submissions-list";
import { TForm } from "../../../../../../../types/form.types";

export type SubmissionsPageProps = {
    params: Promise<{
        id: string
    }>;
    searchParams: Promise<TDataSearchParams>
}

export default async function FormSubmissionsPage(props: SubmissionsPageProps) {
    const { id } = await props.params;

    const form: TForm | null = await getFormById(id);

    if (!form) redirect('/cms/forms');

    return (
        <ContainerLayout
            title={form.title + " Submissions"}
        >
            <FormSubmissionsList form={form} {...props} />
        </ContainerLayout>
    )
}