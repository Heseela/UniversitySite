import { db } from "@/db";
import { credibilityAndSupportTable } from "@/db/schema/credibility-and-support";
import { isNull, not } from "drizzle-orm";
import CredibilityAndSupportForm from "./_client";

type Props = {
  searchParams: Promise<{
    tab: string
  }>
}

export default async function CredibilityAndSupportPage({ searchParams }: Props) {
  const tab = (await searchParams).tab;

  const credibilityAndSupport = await db.query.credibilityAndSupportTable.findFirst({
    where: not(isNull(credibilityAndSupportTable.id)),
  });

  if (!credibilityAndSupport) {
    return (
      <div>Data not found. Please seed it first.</div>
    )
  }

  return (
    <CredibilityAndSupportForm
      credibilityAndSupport={credibilityAndSupport}
      defaultTab={tab || "faqs"}
    />
  )
}