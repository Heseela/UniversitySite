"use client";

import { useEffect, useState } from "react";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
    label?: string;
    placeholder?: string;
    searchKey?: string;
    className?: {
        container?: string;
        input?: string;
    }
    showIcon?: boolean;
}

export default function SearchInput({ label, placeholder, searchKey = "q", className, showIcon = true }: Props) {
    const { searchParams, setSearchParams } = useCustomSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get(searchKey) || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchParams(searchKey, searchTerm?.trim(), false);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return !!label ? (
        <div className={cn("space-y-2", className?.container)}>
            <Label htmlFor="search">{label ?? "Search"}</Label>
            <section className="relative flex items-center w-full">
                {
                    showIcon && <Search className="absolute left-3 text-muted-foreground" size={16} />
                }
                <Input
                    type="search"
                    placeholder={placeholder ?? "Search..."}
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={cn("min-w-[300px]", showIcon && "!pl-9", className?.input)}
                />
            </section>
        </div>
    ) : (
        <section className={cn("relative flex items-center", className?.container)}>
            {
                showIcon && <Search className="absolute left-3 text-muted-foreground" size={16} />
            }
            <Input
                type="search"
                placeholder={placeholder ?? "Search..."}
                value={searchTerm}
                onChange={handleInputChange}
                className={cn("min-w-[300px]", showIcon && "!pl-9", className?.input)}
            />
        </section>
    )
}