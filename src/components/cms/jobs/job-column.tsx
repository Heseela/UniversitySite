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
import { deleteJob } from "@/lib/actions/jobs.action"
import { Badge } from "@/components/ui/badge"
import { EJobStatus, EJobType } from "@/schemas/job.schema"

// Define the exact type that matches your DataTable expectation
type JobTableData = {
  id: string;
  title: string;
  department: string;
  type: EJobType;
  status: EJobStatus;
}

export const jobsColumns: ColumnDef<JobTableData>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return (
                <Link href={`jobs/${row.original.id}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.title}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
            return <span>{row.original.department}</span>
        }
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const typeLabels = {
                [EJobType.FullTime]: "Full Time",
                [EJobType.PartTime]: "Part Time",
                [EJobType.Internship]: "Internship",
                [EJobType.Contract]: "Contract"
            }
            return <Badge variant="outline">{typeLabels[row.original.type]}</Badge>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const statusConfig = {
                [EJobStatus.Open]: { label: "Open", variant: "default" as const },
                [EJobStatus.Closed]: { label: "Closed", variant: "secondary" as const }
            }
            const config = statusConfig[row.original.status]
            return <Badge variant={config.variant}>{config.label}</Badge>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const job = row.original;
            return <JobsColumnActions job={job} />
        },
    },
]

function JobsColumnActions({ job }: { job: JobTableData }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteJob(job.id);
                toast.success("Job deleted successfully");
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Failed to delete job", {
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
                title="Delete Job"
                description="Are you sure you want to delete this job? This action cannot be undone."
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
                    <DropdownMenuItem onClick={() => router.push(`jobs/${job.id}`)}>
                        <SquarePen className="w-4 h-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DestructiveDropdownMenuButtonItem onClick={() => setIsDeleteOpen(true)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </DestructiveDropdownMenuButtonItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}