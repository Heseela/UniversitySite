"use client";

import React, { useState } from "react";
import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FaqClientProps {
  faqData: {
    faqs: TCredibilityAndSupport["faqs"];
    faqCategories: TCredibilityAndSupport["faqCategories"];
  };
}

export const FaqClient: React.FC<FaqClientProps> = ({ faqData }) => {
  const [activeCategory, setActiveCategory] = useState(
    faqData.faqCategories[0]?.name || ""
  );
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const formatCategory = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const filteredFaqs = faqData.faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto">
      {faqData.faqCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqData.faqCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setExpandedQuestion(null);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.name
                  ? "bg-gradient-to-r from-primary to-[var(--pinkish)] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {formatCategory(category.name)}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-300 hover:shadow-lg ${
                expandedQuestion === index 
                  ? "border-blue-100 ring-2 ring-blue-100" 
                  : "border-gray-200"
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left group"
                onClick={() => toggleQuestion(index)}
                aria-expanded={expandedQuestion === index}
              >
                <h3 className={`text-lg font-semibold transition-colors ${
                  expandedQuestion === index 
                    ? "text-primary-500" 
                    : "text-gray-800 group-hover:text-primary-500"
                }`}>
                  {faq.question}
                </h3>
                <span className={`ml-4 p-2 rounded-full transition-all ${
                  expandedQuestion === index 
                    ? "bg-blue-100 text-blue-600 rotate-180" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500"
                }`}>
                  {expandedQuestion === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </span>
              </button>
              
              <div
                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedQuestion === index
                    ? "max-h-96 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-gray-600 leading-relaxed">
                  <RichTextPreview html={faq.answer?.html || ""} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">
              No questions available for this category.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Still have questions?{" "}
           <Button variant={"link"} asChild>
          <Link className="text-primary font-medium flex justify-center" href={"/contact"}>
          Contact our support team
          </Link>
        </Button>
        </p>
      </div>
    </div>
  );
};