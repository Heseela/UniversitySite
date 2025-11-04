import { FormBlockDto } from "@/schemas/page.schema";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TForm } from "../../../../../types/form.types";
import RenderFormFields from "./render-form";

export default async function RenderFormBlock(formBlock: FormBlockDto) {
  const res = await serverFetch(`/forms/${formBlock.form.id}`, {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const form: TForm = await res.json();

  if (!form) return null;

  return <RenderFormFields {...formBlock} {...form} />
}