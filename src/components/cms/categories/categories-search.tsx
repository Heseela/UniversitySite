"use client";

import SearchInput from "@/components/search/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/db/schema/category";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";

export default function CategoriesSearchFilters() {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  return (
    <section className="flex gap-4">
      <SearchInput placeholder="Search by name..." />

      <Select
        defaultValue={searchParams.get("type") || ""}
        onValueChange={(value) => setSearchParams("type", value === "all" ? undefined : value)}
      >
        <SelectTrigger className="w-[180px] capitalize">
          <SelectValue placeholder="Related to" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {Object.values(CategoryType).map((cat, id) => {
            return (
              <SelectItem key={id} className="capitalize" value={cat}>
                {cat}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </section>
  );
}
