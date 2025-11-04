import FormForm from "@/components/cms/forms/form-form"
import { getFormById } from "@/lib/data-access.ts/forms.data";

type Props = {
    params: Promise<{
        id: string
    }>
}

export default async function EditFormPage({ params }: Props) {
    const { id } = await params;

    const form = await getFormById(id);

    if (!form) return <div>Form not found</div>;

    return (
        <FormForm
            defaultValues={form}
            meta={{
                id: form.id,
                createdAt: form.createdAt,
                updatedAt: form.updatedAt
            }}
        />
    )
}