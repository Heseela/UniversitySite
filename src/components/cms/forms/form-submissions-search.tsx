"use client";

import { SelectOption } from "../../../../types/global.types";
import { InfiniteSelect } from "@/components/forms/infinite-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    selected?: SelectOption
}

export default function FormSubmissionsSearch({ selected }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()

    return (
        <section className="max-w-md">
            <InfiniteSelect
                endpoint="/forms/options"
                placeholder="Select a form..."
                limit={10}
                selected={selected}
                onSelectionChange={val => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.set('formId', val.value)
                    params.set('formLabel', val.label)
                    router.push(`${pathname}?${params.toString()}`);
                }}
            />
        </section>
    )
}