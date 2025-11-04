import ContainerLayout from "@/components/cms/container-layout";
import FormsList from "@/components/cms/forms/forms-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TDataSearchParams } from "../../../../../types/global.types";

export const dynamic = "force-dynamic";

export type FormsPageProps = {
  searchParams: Promise<TDataSearchParams>;
};

export default function FormsPage(props: FormsPageProps) {
  return (
    <ContainerLayout
      title="Forms"
      actionTrigger={
        <Button type="button" asChild>
          <Link href={"forms/new"}>
            <Plus />
            Create
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <FormsList {...props} />
      </Suspense>
    </ContainerLayout>
  );
}
