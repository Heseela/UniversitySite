"use client"

import LoadingButton from "@/components/forms/loading-button"
import { createBlog } from "@/lib/actions/blogs.action"
import { blogFormDefaultValues } from "@/schemas/blog.schema"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export default function NewBlogButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleCreate() {
        startTransition(async () => {
            try {
                const res = await createBlog(blogFormDefaultValues);
                const id = res.id;

                if (id) {
                    router.push(`/cms/blogs/${id}`);
                }
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Unexpected Error", {
                        description: e.message,
                    });
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        });
    }

    return (
        <LoadingButton
            isLoading={isPending}
            type="button"
            onClick={handleCreate}
            disabled={isPending}
            loadingText='Creating...'
        >
            <Plus />
            New Blog
        </LoadingButton>
    )
}