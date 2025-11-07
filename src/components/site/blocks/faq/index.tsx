import React from "react";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { FaqClient } from "./faq-client";

interface FaqResponse {
  faqs: TCredibilityAndSupport["faqs"];
  faqCategories: TCredibilityAndSupport["faqCategories"];
}

export const RenderFaqBlock = async () => {
  try {
    const faqResponse = await serverFetch(
      "/credibility-and-support?col=faqs,faqCategories"
    );

    if (!faqResponse.ok) {
      console.error("Failed to fetch FAQs");
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Failed to load FAQs. Please try again later.</p>
        </div>
      );
    }

    const faqData = await faqResponse.json() as FaqResponse;

    if (!faqData?.faqs?.length) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No FAQs available at the moment.</p>
        </div>
      );
    }

    return <FaqClient faqData={faqData} />;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Error loading FAQs. Please try again later.</p>
      </div>
    );
  }
};