"use client";

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, SquarePen, Trash } from "lucide-react"

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
import Link from "next/link"
import { TeamResponse } from "../../../../../types/team.type"
import CloudinaryImage from "@/components/ui/cloudinary-image"
import { deleteTeam } from "@/lib/actions/teams.action"

export const teamsColumns: ColumnDef<TeamResponse[0]>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const image = row.original.image;

            return (
                <Link href={`teams/${row.original.id}`} className="flex gap-1 items-center">
                    {
                        image && (
                            <CloudinaryImage
                                src={image.secure_url}
                                alt={image.alt ?? ""}
                                width={40}
                                height={40}
                            />
                        )
                    }
                    <span className="hover:underline">{row.original.name}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated At",
        cell: ({ row }) => {
            const updatedAt = row.original.updatedAt;
            return updatedAt ? new Date(updatedAt).toLocaleString() : <span>-</span>;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const team = row.original;

            return <TeamsColumnActions team={team} />
        },
    },
]

function TeamsColumnActions({ team }: { team: TeamResponse[0] }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteTeam(team.id);
                toast.success("Team deleted");
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
                title="Delete Team"
                description="Are you sure you want to delete this team? This action cannot be undone."
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
                    <DropdownMenuItem onClick={() => router.push(`teams/${team.id}`)}>
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