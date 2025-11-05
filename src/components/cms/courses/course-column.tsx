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
import { deleteCourse } from "@/lib/actions/courses.action"
import { EAcademicDegree, EAcademicFaculty } from "@/schemas/courses.schema"
import { TCourseTableData } from "../../../../types/course.types"

export const coursesColumns: ColumnDef<TCourseTableData>[] = [
    {
        header: "S.N",
        cell: ({ row }) => <p className="text-14 font-medium"> {row.index + 1} </p>,
    },
    {
        accessorKey: "name",
        header: "Course Name",
        cell: ({ row }) => {
            return (
                <Link href={`courses/${row.original.id}`} className="flex gap-1 items-center">
                    <span className="hover:underline">{row.original.name}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => {
            return <span>{row.original.duration} year{row.original.duration > 1 ? 's' : ''}</span>
        }
    },
    {
        accessorKey: "degree",
        header: "Degree",
        cell: ({ row }) => {
            const degreeLabels: Record<EAcademicDegree, string> = {
                [EAcademicDegree.Post_Graduate]: "Post Graduate",
                [EAcademicDegree.Graduate]: "Graduate",
                [EAcademicDegree.Undergraduate]: "Undergraduate",
                [EAcademicDegree.PhD]: "PhD",
            };
            return <span>{degreeLabels[row.original.degree as EAcademicDegree]}</span>
        }
    },
    {
        accessorKey: "faculty",
        header: "Faculty",
        cell: ({ row }) => {
            const facultyLabels: Record<EAcademicFaculty, string> = {
                [EAcademicFaculty.Science]: "Science",
                [EAcademicFaculty.Management]: "Management",
                [EAcademicFaculty.Arts]: "Arts",
                [EAcademicFaculty.Humanity]: "Humanity",
                [EAcademicFaculty.Law]: "Law",
                [EAcademicFaculty.Other]: "Other",
            };
            return <span>{facultyLabels[row.original.faculty as EAcademicFaculty]}</span>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const course = row.original;
            return <CoursesColumnActions course={course} />
        },
    },
]

function CoursesColumnActions({ course }: { course: TCourseTableData }) {
    const router = useRouter();
    const [isDeleting, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteCourse(course.id);
                toast.success("Course deleted successfully");
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
                title="Delete Course"
                description="Are you sure you want to delete this course? This action cannot be undone."
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
                    <DropdownMenuItem onClick={() => router.push(`courses/${course.id}`)}>
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