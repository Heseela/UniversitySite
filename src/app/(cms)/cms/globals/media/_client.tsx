"use client";

import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import SearchInput from '@/components/search/search-input';
import React, { useMemo, useState, useTransition } from 'react'
import { TMedia, TMediaResponse } from '../../../../../../types/media.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, formatBytes } from '@/lib/utils';
import CloudinaryImage from '@/components/ui/cloudinary-image';
import Link from 'next/link';
import ContainerLayout from '@/components/cms/container-layout';
import { ResponsiveAlertDialog } from '@/components/ui/responsive-alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MediaUploadDialog from '@/components/media/media-upload-dialog';
import { Upload } from 'lucide-react';
import { UploadBulkMedia } from '@/components/media/upload-bulk-media';
import { deleteMedia } from '@/lib/actions/media.action';

type Props = {
    media: TMediaResponse
}

export default function MediaPage__Client({ media: { meta, data } }: Props) {
    const [selectedMap, setSelectedMap] = useState<Map<string, TMedia>>(new Map());

    const pageRows = data ?? [];
    const pageIds = useMemo(() => new Set(pageRows.map((r) => r.public_id)), [pageRows]);

    const allOnPageSelected =
        pageRows.length > 0 && pageRows.every((r) => selectedMap.has(r.public_id));
    const someOnPageSelected =
        pageRows.some((r) => selectedMap.has(r.public_id)) && !allOnPageSelected;

    const toggleRow = (m: TMedia, checked?: boolean) => {
        setSelectedMap((prev) => {
            const next = new Map(prev);
            const willCheck = checked ?? !next.has(m.public_id);
            if (willCheck) next.set(m.public_id, m);
            else next.delete(m.public_id);
            return next;
        });
    };

    const toggleAllOnPage = (checked: boolean | "indeterminate") => {
        setSelectedMap((prev) => {
            const next = new Map(prev);
            if (checked === true || checked === "indeterminate") {
                for (const m of pageRows) next.set(m.public_id, m);
            } else {
                for (const id of pageIds) next.delete(id);
            }
            return next;
        });
    };

    return (
        <ContainerLayout
            title="Media"
            actionTrigger={<MediaActions selectedMap={selectedMap} setSelectedMap={setSelectedMap} />}
        >
            <div className='space-y-6'>
                <SearchInput />

                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className='bg-border'>
                            <TableRow>
                                <TableHead className="w-[44px] pl-2">
                                    <Checkbox
                                        checked={allOnPageSelected ? true : someOnPageSelected ? "indeterminate" : false}
                                        onCheckedChange={(c) => toggleAllOnPage(c)}
                                        aria-label="Select all on page"
                                    />
                                </TableHead>
                                <TableHead>File Name</TableHead>
                                <TableHead>Alt</TableHead>
                                <TableHead>Caption</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pageRows.map((m) => {
                                const checked = selectedMap.has(m.public_id);
                                return (
                                    <TableRow key={m.public_id} className={cn(checked && "bg-accent/40")}>
                                        <TableCell className="pl-2">
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={(c) => toggleRow(m, !!c)}
                                                aria-label={`Select ${m.name}`}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/cms/globals/media/${m.public_id}`}
                                                className="group flex items-center gap-5 p-2"
                                            >
                                                <CloudinaryImage
                                                    src={m.secure_url}
                                                    alt={m.alt || ""}
                                                    height={40}
                                                    width={40}
                                                    crop="auto"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium group-hover:underline underline-offset-2">{m.name}</span>
                                                    <p className="text-muted-foreground text-xs">
                                                        <span>{formatBytes(m.bytes)} | </span>
                                                        <span>{m.width} x {m.height} | </span>
                                                        <span>{m.resource_type}/{m.format}</span>
                                                    </p>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {m.alt ? (
                                                <span className="text-sm">{m.alt}</span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">&lt;No Alt&gt;</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {m.caption ? (
                                                <span className="text-sm">{m.caption}</span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">&lt;No Caption&gt;</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">{new Date(m.updatedAt).toLocaleString()}</span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                <DataTablePagination meta={meta} />
            </div>
        </ContainerLayout >
    )
}

function MediaActions({
    selectedMap,
    setSelectedMap
}: {
    selectedMap: Map<string, TMedia>,
    setSelectedMap: React.Dispatch<React.SetStateAction<Map<string, TMedia>>>
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, startDeleteTransition] = useTransition();
    const [createNewOpen, setCreateNewOpen] = useState(false);

    const selectedSize = selectedMap.size;
    const hasAnySelected = selectedSize > 0;

    function handleDeleteSelected() {
        startDeleteTransition(async () => {
            try {
                await deleteMedia(Array.from(selectedMap.keys()));
                setSelectedMap(new Map());
                toast.success("Media deleted successfully");
            } catch (e) {
                toast.error("An unexpected error occurred");
            }
        })
    }

    return (
        <section className='space-x-2'>
            {
                hasAnySelected && (
                    <>
                        <ResponsiveAlertDialog
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            title={`Delete ${selectedSize} items`}
                            description="Are you sure want to delete selected items from media gallery?"
                            isLoading={isDeleting}
                            action={handleDeleteSelected}
                            actionLabel="Yes, delete"
                            loadingText="Removing..."
                        />

                        <Button
                            size={"lg"}
                            variant={"destructive"}
                            disabled={!hasAnySelected}
                            onClick={() => setIsOpen(true)}
                        >
                            Delete ({selectedSize} items)
                        </Button>
                    </>
                )
            }

            <MediaUploadDialog
                isOpen={createNewOpen}
                onClose={() => { }}
                className="full-screen-dialog p-0"
            >
                <UploadBulkMedia
                    onClose={() => setCreateNewOpen(false)}
                    onChange={() => { }} // this internally uploads the media
                />
            </MediaUploadDialog>

            <Button
                type="button"
                size={"lg"}
                variant={"secondary"}
                onClick={() => setCreateNewOpen(true)}
            >
                <Upload />
                Upload
            </Button>
        </section>
    )
}