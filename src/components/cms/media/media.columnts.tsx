"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TMedia } from "../../../../types/media.types";
import CloudinaryImage from "@/components/ui/cloudinary-image";

export const mediaColumns: ColumnDef<TMedia>[] = [
    {
        accessorKey: 'secure_url',
        header: "File Name",
        cell: ({ row }) => {
            return (
                <section
                    role="button"
                    className='flex items-center gap-5 p-2 hover:cursor-pointer'
                >
                    <CloudinaryImage
                        src={row.original.secure_url}
                        alt={row.original.alt}
                        height={40}
                        width={40}
                        crop='auto'
                        className="rounded-sm"
                    />
                    <span className='text-sm underline underline-offset-2'>{row.original.name}</span>
                </section>
            )
        }
    },
    {
        accessorKey: 'alt',
        header: "Alt",
        cell: ({ row }) => {
            return (
                row.original.alt ? (
                    <span className='text-sm'>{row.original.alt}</span>
                ) : (
                    <span className='text-sm text-muted-foreground'>&lt;No Alt&gt;</span>
                )
            )
        }
    },
    {
        accessorKey: 'caption',
        header: "Caption",
        cell: ({ row }) => {
            return (
                row.original.caption ? (
                    <span className='text-sm'>{row.original.caption}</span>
                ) : (
                    <span className='text-sm text-muted-foreground'>&lt;No Caption&gt;</span>
                )
            )
        }
    },
    {
        accessorKey: 'updatedAt',
        header: "Updated At",
        cell: ({ row }) => {
            return (
                <span className='text-sm'>{new Date(row.original.updatedAt).toLocaleString()}</span>
            )
        }
    }
]