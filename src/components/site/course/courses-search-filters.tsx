"use client";

import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

export default function CoursesSearchFilters() {
  const { setSearchParams, searchParams } = useCustomSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    startTransition(() => {
      setSearchParams("q", value || undefined, false);
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    startTransition(() => {
      setSearchParams("q", undefined, false);
    });
  };

  return (
    <div className="mb-12">
      <div className="relative max-w-md">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses by name..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
        
        {isPending && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {searchQuery && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Searching for:</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            "{searchQuery}"
          </span>
          <button
            onClick={clearSearch}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}