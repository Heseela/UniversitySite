"use client"

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
import { TEventsResponse } from "../../../../types/event.types"
import { deleteEvent } from "@/lib/actions/events.action"
import { format } from "date-fns"

export const eventsColumns: ColumnDef<TEventsResponse[0]>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={`events/${row.original.id}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.title}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "eventDate",
        header: "Event Date",
        cell: ({ row }) => {
            const eventDate = format(new Date(row.original.eventDate), "EEE do MMMM, yyyy 'at' hh:mm a");
            return <span>{eventDate}</span>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const event = row.original;

            return <EventsColumnActions event={event} />
        },
    },
]

function EventsColumnActions({ event }: { event: TEventsResponse[0] }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteEvent(event.id);
                toast.success("Event deleted");
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
                title="Delete Event"
                description="Are you sure you want to delete this event? This action cannot be undone."
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
                    <DropdownMenuItem onClick={() => router.push(`events/${event.id}`)}>
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