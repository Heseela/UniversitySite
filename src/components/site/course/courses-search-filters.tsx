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
    </div>
  );
}
