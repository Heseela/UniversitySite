import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { FaqClient } from "./faq-client";

interface FaqResponse {
  faqs: TCredibilityAndSupport["faqs"];
  faqCategories: TCredibilityAndSupport["faqCategories"];
}

export const RenderFaqBlock = async () => {
  const faqResponse = await serverFetch("/credibility-and-support?col=faqs,faqCategories", {
    next: { revalidate: parseInt(process.env.NEXT_PUBLIC_DATA_REVALIDATE_SEC!) },
  });

  if (!faqResponse.ok) return null;

  const faqData: FaqResponse = await faqResponse.json();

  if (!faqData.faqs.length) return null;

  return <FaqClient faqData={faqData} />;
};