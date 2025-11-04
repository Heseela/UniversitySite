"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Send, SquarePen, Trash } from "lucide-react"

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
import { deleteForm } from "@/lib/actions/forms.action"
import Link from "next/link"
import { TFormsResponse } from "../../../../types/form.types"

export const formsColumns: ColumnDef<TFormsResponse["data"][0]>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={`forms/${row.original.id}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.title}</span>
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
        id: "actions",
        cell: ({ row }) => {
            const form = row.original;

            return <FormsColumnActions form={form} />
        },
    },
]

function FormsColumnActions({ form }: { form: TFormsResponse["data"][0] }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteForm(form.id);
                toast.success("Form deleted");
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
                title="Delete Form"
                description="Are you sure you want to delete this form? This action cannot be undone."
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
                    <DropdownMenuItem onClick={() => router.push(`forms/${form.id}`)}>
                        <SquarePen />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`forms/${form.id}/submissions`)}>
                        <Send />
                        Submissions
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