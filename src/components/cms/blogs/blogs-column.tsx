"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, SquarePen, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DestructiveDropdownMenuButtonItem,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog"
import { toast } from "sonner"
import { deleteBlog } from "@/lib/actions/blogs.action"
import Link from "next/link"
import { TBlogsResponse } from "../../../../types/blog.types"

export const blogsColumns: ColumnDef<TBlogsResponse[0]>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={`blogs/${row.original.id}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.title}</span>
                    {row.original.isFavourite && (
                        <span title="Favourite">
                            <Star size={16} className="text-orange-400 fill-orange-400" />
                        </span>
                    )}
                </Link>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated At",
        cell: ({ row }) => {
            const updatedAt = row.original.updatedAt;
            return new Date(updatedAt).toLocaleString();
        }
    },
    {
        accessorKey: "publishedAt",
        header: "Last Published At",
        cell: ({ row }) => {
            const publishedAt = row.original.publishedAt;
            return publishedAt ? new Date(publishedAt).toLocaleString() : <span className="text-destructive">Not Published</span>;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blog = row.original;

            return <BlogsColumnActions blog={blog} />
        },
    },
]

function BlogsColumnActions({ blog }: { blog: TBlogsResponse[0] }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteBlog(blog.id);
                toast.success("Blog deleted");
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Unexpected Error", {
                        description: e.message,
                    });
                } else {
                    toast.error("An unexpected error occurred");
                }
            } finally {
                setIsDeleteOpen(false);
            }
        });
    }

    return (
        <>
            <ResponsiveAlertDialog
                action={handleDelete}
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                title="Delete Blog"
                description="Are you sure you want to delete this blog? This action cannot be undone."
                actionLabel="Yes, delete"
                isLoading={isDeleting}
                loadingText="Deleting..."
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`blogs/${blog.id}`)}>
                        <SquarePen />
                        Edit
                    </DropdownMenuItem>
                    <DestructiveDropdownMenuButtonItem onClick={() => setIsDeleteOpen(true)}>
                        <Trash className="text-destructive" />
                        Delete
                    </DestructiveDropdownMenuButtonItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}