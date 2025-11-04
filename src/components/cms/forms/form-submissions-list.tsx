import { getFormSubmissions } from "@/lib/data-access.ts/forms.data";
import { SubmissionsPageProps } from "@/app/(cms)/cms/forms/[id]/submissions/page";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TForm } from "../../../../types/form.types";

export default async function FormSubmissionsList({ params, searchParams, form }: SubmissionsPageProps & { form: TForm }) {
    const [paramProps, searchParamProps] = await Promise.all([params, searchParams]);

    const submissions = await getFormSubmissions(paramProps.id, searchParamProps);

    if (!submissions) return <div>Error loading form submissions</div>;

    const fieldNames = form.fields.map(field => field.name);

    return (
        <section>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12 bg-border">S.N</TableHead>
                            {
                                form.fields.map((field, ind) => <TableHead key={ind} className="bg-border">{field.label}</TableHead>)
                            }
                            <TableHead className="bg-border">Submitted At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            submissions?.data.map((submission, ind) => {
                                return (
                                    <TableRow key={submission.id}>
                                        <TableCell>{ind + 1}</TableCell>
                                        {
                                            fieldNames.map(fieldName => <TableCell key={fieldName}>{submission.data[fieldName] as string}</TableCell>)
                                        }
                                        <TableCell>{new Date(submission.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })
                        }

                        {
                            submissions.data?.length === 0 && <TableRow>
                                <TableCell colSpan={fieldNames.length + 2} className="py-12 text-center text-muted-foreground">
                                    No submissions found
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}