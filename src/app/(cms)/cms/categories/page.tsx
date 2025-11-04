import CategoriesList from "@/components/cms/categories/categories-list";
import NewCategoryBtn from "@/components/cms/categories/new-category-btn";
import ContainerLayout from "@/components/cms/container-layout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Categories",
};

export type CategoriesPageProps = {
  searchParams: {
    q?: string;
    type?: string;
    limit?: string;
  };
};

export default async function CategoriesPage(props: {
  searchParams: Promise<CategoriesPageProps["searchParams"]>;
}) {
  const searchParams = await props.searchParams;

  return (
    <ContainerLayout
      title="Categories"
      description="Manage your categories here."
      actionTrigger={<NewCategoryBtn />}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesList searchParams={searchParams} />
      </Suspense>
    </ContainerLayout>
  );
}
