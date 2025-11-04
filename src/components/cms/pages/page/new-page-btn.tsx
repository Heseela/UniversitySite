"use client";

import LoadingButton from '@/components/forms/loading-button';
import { createNewPage } from '@/lib/actions/pages.action';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react'
import { toast } from 'sonner';

export default function NewPageButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleCreate() {
        if (isPending) return;

        startTransition(async () => {
            try {
                const { id } = await createNewPage();

                if (id) router.push(`pages/${id}`);
            } catch (e) {
                console.error(e);
                toast.error("An unexpected error occurred");
            }
        })
    }

    return (
        <LoadingButton
            type="button"
            onClick={handleCreate}
            disabled={isPending}
            isLoading={isPending}
            loadingText='Creating...'
        >
            <Plus />
            New Page
        </LoadingButton>
    )
}