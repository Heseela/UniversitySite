"use client";

import { useEffect, useMemo, useState, useTransition } from 'react';
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useFetchData } from '@/hooks/useFetchData';
import { LoaderCircle, Search, X } from 'lucide-react';
import CloudinaryImage from '../ui/cloudinary-image';
import { Input } from '../ui/input';
import { cn, createQueryString, formatBytes, showServerError } from '@/lib/utils';
import { TMediaSchema } from '@/schemas/media.schema';
import { uploadMedia } from '@/lib/actions/media.action';
import { Textarea } from '../ui/textarea';
import CustomDialog from '../ui/custom-dialog';
import LoadingButton from '../forms/loading-button';
import { TMedia, TMediaResponse } from '../../../types/media.types';
import { MediaSelectDataTablePagination } from './media-select-data-table-patination';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AddFilesButton } from './add-files-btn';
import { Checkbox } from '../ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type MediaFieldProps = {
    media: TMediaSchema;
    onChange: (value: TMedia[]) => void;
    onClose: () => void;
    onRemove: () => void;
    defaultSelected?: TMedia[]
}

export function MediaInput__Bulk({ onChange, defaultSelected }: Pick<MediaFieldProps, 'onChange' | 'defaultSelected'>) {
    const [createNewOpen, setCreateNewOpen] = useState(false);
    const [selectorOpen, setSelectorOpen] = useState(false);

    return (
        <section className='border rounded-md p-4 flex items-center gap-4'>
            <CustomDialog
                isOpen={createNewOpen}
                onClose={() => setCreateNewOpen(false)}
                title='Media'
                className="full-screen-dialog"
            >
                <CreateNew
                    onClose={() => setCreateNewOpen(false)}
                    onChange={onChange}
                />
            </CustomDialog>

            <Button
                type="button"
                variant={"secondary"}
                size={"sm"}
                className='font-normal text-xs'
                onClick={() => setCreateNewOpen(true)}
            >
                Upload New
            </Button>

            <span className='text-muted-foreground'>or</span>

            <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant={"secondary"}
                        size={"sm"}
                        className='font-normal text-xs'
                    >
                        Choose Existing
                    </Button>
                </DialogTrigger>
                <DialogContent className='full-screen-dialog block'>
                    <DialogHeader>
                        <DialogTitle>
                            <span id="dialog-title">Select Media</span>
                        </DialogTitle>
                    </DialogHeader>

                    <section className='h-full pt-10'>
                        <MediaSelector
                            onClose={() => setSelectorOpen(false)}
                            onChange={onChange}
                            defaultSelected={defaultSelected}
                        />
                    </section>
                </DialogContent>
            </Dialog>
        </section>
    )
}

function CreateNew({ onClose, onChange }: Pick<MediaFieldProps, 'onClose' | 'onChange'>) {
    const [files, setFiles] = useState<TMediaSchema[]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [isSaving, startTransition] = useTransition();

    function updateActive<K extends keyof TMediaSchema>(key: K, val: TMediaSchema[K]) {
        setFiles(prev => {
            const copy = [...prev];
            copy[activeIdx] = { ...copy[activeIdx], [key]: val };
            return copy;
        });
    }

    function removeAt(index: number) {
        setFiles(prev => {
            const copy = prev.filter((_, i) => i !== index);
            // fix active index
            if (copy.length === 0) {
                setActiveIdx(0);
            } else if (activeIdx >= copy.length) {
                setActiveIdx(copy.length - 1);
            }
            return copy;
        });
    }

    function onSave() {
        if (!files.length) return onClose();

        startTransition(async () => {
            try {
                const inserted = await uploadMedia(files);
                onChange(inserted);
                onClose();
            } catch (e) {
                showServerError(e);
            }
        });
    }

    if (files.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
                <AddFilesButton
                    onFiles={(batch) => {
                        setFiles((prev) => {
                            const startIdx = prev.length;          // index of the first new item
                            const next = [...prev, ...batch];
                            setActiveIdx(startIdx);
                            return next;
                        });
                    }}
                />

                <p className="text-sm">Select images to begin.</p>
            </div>
        )
    }

    return (
        <section className="h-full flex">
            {/* LEFT: sidebar list */}
            <aside className="w-[280px] border-r shrink-0 p-3 space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {files.length ? `${files.length} Files to Upload` : 'No files yet'}
                    </span>
                    <AddFilesButton
                        onFiles={(batch) => {
                            setFiles((prev) => {
                                const startIdx = prev.length;
                                const next = [...prev, ...batch];
                                setActiveIdx(startIdx);
                                return next;
                            });
                        }}
                    />
                </div>

                <div className="space-y-1 overflow-auto h-[calc(100%-3.5rem)] pr-1">
                    {files.map((f, i) => (
                        <div
                            key={f.public_id ?? `${f.name}-${i}`}
                            role="button"
                            onClick={() => setActiveIdx(i)}
                            className={cn(
                                'flex items-center gap-2 px-2 py-1 rounded hover:bg-accent/40 cursor-pointer',
                                i === activeIdx && 'bg-accent/60'
                            )}
                        >
                            <CloudinaryImage
                                src={f.secure_url}
                                alt={f.name}
                                width={30}
                                height={30}
                                sizes="30px"
                                crop='fill'
                            />
                            <div className="truncate">
                                <div className="truncate text-xs">{f.name}</div>
                                <div className="text-[11px] text-muted-foreground">
                                    {formatBytes(f.bytes || 0)}
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-6 ml-auto"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeAt(i);
                                }}
                                aria-label="Remove"
                                title="Remove"
                            >
                                <X className="size-3.5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* RIGHT: editor panel */}
            <main className="flex-1 h-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-muted-foreground">
                        {files.length ? `1 of ${files.length}` : ''}
                    </div>
                    <LoadingButton
                        isLoading={isSaving}
                        loadingText="Saving..."
                        onClick={onSave}
                    >
                        Save
                    </LoadingButton>
                </div>

                <div className="space-y-6">
                    {/* preview + filename row */}
                    <div className="border rounded-sm overflow-hidden">
                        <div className="flex items-center">
                            <CloudinaryImage
                                src={files[activeIdx]?.secure_url || ''}
                                alt={files[activeIdx]?.alt || 'preview'}
                                width={300}
                                height={180}
                            />
                            <div className="flex-1 p-6 flex items-center justify-between gap-6">
                                <div className="min-w-[320px]">
                                    <label className="text-sm font-medium">Name <span className="text-destructive">*</span></label>
                                    <Input
                                        className="py-5 mt-1"
                                        value={files[activeIdx]?.name || ''}
                                        onChange={(e) => updateActive('name', e.target.value)}
                                        placeholder="Eg. brandLogo"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alt */}
                    <div>
                        <label className="text-sm font-medium">Alt</label>
                        <Input
                            className="py-5 mt-1"
                            value={files[activeIdx]?.alt || ''}
                            onChange={(e) => updateActive('alt', e.target.value)}
                            placeholder="Eg. an alternative text to describe the media"
                        />
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="text-sm font-medium">Caption</label>
                        <Textarea
                            className="field-sizing-content overflow-y-hidden resize-none mt-1"
                            placeholder="Title"
                            value={files[activeIdx]?.caption || ''}
                            onChange={(e) => updateActive('caption', e.target.value)}
                        />
                    </div>
                </div>
            </main>
        </section>
    );
}


export default function MediaSelector({ onClose, onChange, defaultSelected }: Pick<MediaFieldProps, 'onClose' | 'onChange' | 'defaultSelected'>) {
    const [search, setSearch] = useState("");
    const [queryParams, setQueryParams] = useState<Record<string, string | undefined>>({
        resource_type: "image",
    });

    // persistent selection across pages
    const [selectedMap, setSelectedMap] = useState<Map<string, TMedia>>(
        () => new Map((defaultSelected ?? []).map(m => [m.public_id, m]))
    );

    const selectedCount = selectedMap.size;

    const queryString = useMemo(() => createQueryString(queryParams), [queryParams]);

    const { data, isLoading } = useFetchData<TMediaResponse>({
        endpoint: "/media",
        queryKey: ["media", queryString],
        queryString,
    });

    // debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            setQueryParams((p) => ({ ...p, q: search }));
        }, 500);
        return () => clearTimeout(t);
    }, [search]);

    const pageRows = data?.data ?? [];
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

    if (isLoading)
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <LoaderCircle className="animate-spin" size={32} />
                <span>Loading...</span>
            </div>
        );

    return (
        <div className="space-y-6">
            {/* Search */}
            <section className="relative flex items-center w-full">
                <Search className="absolute left-3 text-muted-foreground" size={16} />
                <Input
                    type="search"
                    placeholder="Search by File Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full !pl-9 py-5"
                />
            </section>

            {/* Table */}
            <ScrollArea className="h-[69vh] w-full">
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
                                    <TableRow key={m.public_id} className={cn("hover:cursor-pointer", checked && "bg-accent/40")} onClick={() => toggleRow(m)}>
                                        <TableCell className="pl-2">
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={(c) => toggleRow(m, !!c)}
                                                aria-label={`Select ${m.name}`}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-5 p-2">
                                                <CloudinaryImage
                                                    src={m.secure_url}
                                                    alt={m.alt || ""}
                                                    height={40}
                                                    width={40}
                                                    crop="auto"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm underline underline-offset-2">{m.name}</span>
                                                    <span className="text-[11px] text-muted-foreground">{formatBytes(m.bytes)}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="align-top">
                                            {m.alt ? (
                                                <span className="text-sm">{m.alt}</span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">&lt;No Alt&gt;</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="align-top">
                                            {m.caption ? (
                                                <span className="text-sm">{m.caption}</span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">&lt;No Caption&gt;</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="align-top">
                                            <span className="text-sm">{new Date(m.updatedAt).toLocaleString()}</span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Pagination + actions */}
            <div className="flex items-center justify-between gap-3">
                {data?.meta && (
                    <MediaSelectDataTablePagination meta={data.meta} setQueryParams={setQueryParams} />
                )}

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        {selectedCount ? `${selectedCount} selected` : "No selection"}
                    </span>
                    {selectedCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMap(new Map())}>
                            Clear
                        </Button>
                    )}
                    <Button
                        size="sm"
                        disabled={selectedCount === 0}
                        onClick={() => {
                            onChange(Array.from(selectedMap.values())); // ← array of TMedia
                            onClose();
                        }}
                    >
                        Add Selected ({selectedCount})
                    </Button>
                </div>
            </div>
        </div>
    );
}

