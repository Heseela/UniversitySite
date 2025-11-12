"use client";

import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import SearchInput from "@/components/search/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { EAcademicDegree, EAcademicFaculty } from "@/schemas/courses.schema";

const schema = z
  .object({
    q: z.string().optional(),
    faculty: z.nativeEnum(EAcademicFaculty).optional(),
    degree: z.nativeEnum(EAcademicDegree).optional(),
  })
  .partial();


export default function CoursesSearchFilters_Public() {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const { success } = schema.safeParse({
      q: searchParams.get("q"),
      faculty: searchParams.get("faculty"),
      degree: searchParams.get("degree"),
    });

    if (!success) {
      // if any of the values are invalid, reset the search params
      return router.push(pathname);
    }
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <div className="group mb-12 flex gap-1 border border-gray-300 rounded-lg items-center pr-3 focus-within:ring-2 focus-within:ring-primary transition-all">
      <Select
        defaultValue={searchParams.get("faculty") || ""}
        onValueChange={(value) =>
          setSearchParams(
            "faculty",
            value === "all" ? undefined : value,
            false
          )
        }
      >
        <SelectTrigger className="py-6 border-0 shadow-none focus-visible:ring-0">
          <SelectValue placeholder="All Faculties" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Faculties</SelectItem>
          {Object.entries(EAcademicFaculty).map(([k, v]) => {
            return <SelectItem key={v} value={v}>{k}</SelectItem>
          })}
        </SelectContent>
      </Select>

      <Select
        defaultValue={searchParams.get("degree") || ""}
        onValueChange={(value) =>
          setSearchParams(
            "degree",
            value === "all" ? undefined : value,
            false
          )
        }
      >
        <SelectTrigger className="py-6 border-0 shadow-none focus-visible:ring-0">
          <SelectValue placeholder="All Degrees" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Degrees</SelectItem>
          {Object.entries(EAcademicDegree).map(([k, v]) => {
            return <SelectItem key={v} value={v}>{k.split("_").join(" ")}</SelectItem>
          })}
        </SelectContent>
      </Select>

      <SearchInput
        placeholder="Search courses..."
        className={{
          input: "min-w-auto flex-1 py-6 border-0 shadow-none focus-visible:ring-0",
          container: "grow",
        }}
        showIcon={false}
      />

      <div className="shrink-0 sm:block hidden">
        <Search
          className="text-muted-foreground group-focus-within:text-foreground"
          size={20}
        />
      </div>
>>>>>>> a160e4da1d29c3554168949a9c9321e40f90882f
    </div>
  );
}
