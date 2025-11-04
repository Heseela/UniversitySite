"use client";

import {
    ChevronRight,
    ChevronLeft,
    ChevronsRight,
    ChevronsLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TMeta } from "../../../types/global.types";
import { Dispatch, SetStateAction } from "react";

function getNearestTensArray(num: number) {
    const result = [];
    for (let i = 10; i <= 50; i += 10) {
        result.push(i);
        if (i >= num) break;
    }
    return result;
}

interface DataTablePaginationProps {
    meta: TMeta;
    setQueryParams: Dispatch<SetStateAction<Record<string, string | undefined>>>;
}

export function MediaSelectDataTablePagination({
    meta,
    setQueryParams
}: DataTablePaginationProps) {

    const setParams = (key: string, value: string | undefined) => {
        setQueryParams(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="flex items-center sm:justify-between sm:flex-row flex-col gap-3 px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                Total: {meta.itemCount} Records
            </div>
            <div className="w-full sm:w-fit flex flex-wrap items-center justify-between space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${meta.pageSize}`}
                        onValueChange={(value) => {
                            if (value) {
                                setParams("pageSize", value);
                            } else {
                                setParams("pageSize", undefined);
                            }
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={meta.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {getNearestTensArray(meta.itemCount).map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-x-6 lg:space-x-8 flex items-center">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {meta.page} of {meta.pageCount}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => {
                                setParams("page", "1");
                            }}
                            disabled={!meta.hasPreviousPage}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                setParams("page", `${meta.page - 1}`);
                            }}
                            disabled={!meta.hasPreviousPage}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                setParams("page", `${meta.page + 1}`);
                            }}
                            disabled={!meta.hasNextPage}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => {
                                setParams("page", `${meta.pageCount}`);
                            }}
                            disabled={!meta.hasNextPage}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}