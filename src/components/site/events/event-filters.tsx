"use client";

import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { Filter } from "lucide-react";
import { TPaginatedOptions } from "../../../../types/global.types";

type Props = {
  categories: TPaginatedOptions | null;
};

export default function EventFilters({ categories }: Props) {
  const { setSearchParams, searchParams } = useCustomSearchParams();

  return (
    <div className="mb-12 flex flex-wrap items-center gap-4">
      <div className="flex items-center mr-4">
        <Filter size={20} className="text-primary mr-2" />
        <span className="font-semibold">Filter by:</span>
      </div>

      <button
        onClick={() => setSearchParams("category", undefined, false)}
        className={`px-4 py-2 rounded-full ${
          !searchParams.get("category")
            ? "bg-primary text-white"
            : "bg-gray-100 text-slate-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      {categories?.data.map((c) => (
        <button
          key={c.value}
          onClick={() => setSearchParams("category", c.label, false)}
          className={`px-4 py-2 rounded-full ${
            searchParams.get("category") === c.label
              ? "bg-primary text-white"
              : "bg-gray-100 text-slate-600 hover:bg-gray-200"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
