"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import axios from "axios"
import { TPaginatedOptions } from "../../types/global.types"

const emptyPaginatedData: TPaginatedOptions = {
    data: [],
    meta: {
        hasNextPage: false,
        hasPreviousPage: false,
        page: 1,
        itemCount: 0,
        pageCount: 1,
        pageSize: 0
    }
} 

export function useInfiniteOptions(endpoint: string, queryString = "") {
    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch } = useInfiniteQuery({
        queryKey: [endpoint, queryString, "options"],
        queryFn: async ({ pageParam }) => {
            const url = process.env.NEXT_PUBLIC_URL + '/api/' + endpoint + `?page=${pageParam}&` + queryString;
            const response = await axios.get<TPaginatedOptions>(url);
            return response.data ?? emptyPaginatedData;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined
        },
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    // Flatten all pages into a single array of options
    const options = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? []
    }, [data])

    // Get total count from the first page
    const totalCount = data?.pages[0]?.meta.itemCount ?? 0

    return {
        options,
        totalCount,
        error: error as Error | null,
        fetchNextPage,
        hasNextPage: !!hasNextPage,
        isLoading: status === "pending",
        isFetching,
        isFetchingNextPage,
        refetch,
    }
}
