"use client";

import SearchInput from "@/components/search/search-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

const schema = z.object({
    published: z.enum(["all", "true", "false"]).default("all"),
    favourite: z.literal("true"),
}).partial();

export default function BlogsSearchFilters() {
    const { searchParams, setSearchParams } = useCustomSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const { success } = schema.safeParse({
            published: searchParams.get("published")
        });

        if (!success) { // if any of the values are invalid, reset the search params
            return router.push(pathname);
        }
    }, []);

    return (
        <section className="flex gap-4">
            <SearchInput placeholder="Search by title..." />

            <Select
                defaultValue={searchParams.get("published") || ""}
                onValueChange={(value) => setSearchParams("published", value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Is Published?" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Only Published</SelectItem>
                    <SelectItem value="false">Only Unpublished</SelectItem>
                </SelectContent>
            </Select>

            <div className="ml-auto flex items-center space-x-2">
                <Checkbox
                    id="favourite"
                    checked={searchParams.get("favourite") === "true"}
                    onCheckedChange={(checked) => setSearchParams("favourite", checked ? "true" : undefined)}
                />
                <label
                    htmlFor="favourite"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Favourite
                </label>
            </div>
        </section>
    )
}